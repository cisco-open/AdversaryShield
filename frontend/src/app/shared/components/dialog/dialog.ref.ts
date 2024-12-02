import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { DialogClose } from './models/interfaces/dialog-config.interface';

export class DialogRef {
	private afterClosedSubject = new Subject<any>();

	constructor(private overlayRef: OverlayRef) {}

	public backdropClick(): Observable<MouseEvent> {
		return this.overlayRef.backdropClick();
	}

	public close(result?: DialogClose<any>) {
		this.overlayRef.dispose();
		this.afterClosedSubject.next(result);
		this.afterClosedSubject.complete();
	}

	public afterClosed(): Observable<any> {
		return this.afterClosedSubject.asObservable();
	}
}
