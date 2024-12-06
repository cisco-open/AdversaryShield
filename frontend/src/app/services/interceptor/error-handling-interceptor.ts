import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../../shared/components/notification/services/notification.service';

@Injectable()
export class HttpErrorHandlingService {
	readonly notificationService = inject(NotificationService);

	handleError(_: HttpRequest<any>, errorResponse: HttpErrorResponse): Observable<never> {
		const { message: errorMessage } = errorResponse;

		switch (errorResponse.status) {
			case 400:
			case 404:
			case 500:
			case 503:
				this.spawnNotification(errorMessage);
				break;
			case 504:
				this.spawnNotification(errorMessage);
				break;
			default:
				this.spawnNotification(errorMessage);
				break;
		}

		return throwError(() => errorResponse);
	}

	private spawnNotification(body: string) {
		this.notificationService.showError(body);
	}
}

@Injectable()
export class AppErrorHandlingInterceptor implements HttpInterceptor {
	constructor(private errorHandler: HttpErrorHandlingService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return next.handle(req).pipe(
			catchError((error) => {
				return this.errorHandler.handleError(req, error);
			})
		);
	}
}
