import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { Provider } from '@angular/core';
import { AppErrorHandlingInterceptor, HttpErrorHandlingService } from './interceptor/error-handling-interceptor';

export function provideInterceptors(): Provider[] {
	return [HttpErrorHandlingService, { provide: HTTP_INTERCEPTORS, useClass: AppErrorHandlingInterceptor, multi: true }];
}
