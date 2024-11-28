import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { DrawerClose } from './models/interfaces/drawer-config.interface';

export class DrawerRef {
	private afterClosedSubject = new Subject<any>();

	constructor(private overlayRef: OverlayRef) {}

	public backdropClick(): Observable<MouseEvent> {
		return this.overlayRef.backdropClick();
	}

	public close(result?: DrawerClose<any>) {
		this.overlayRef.dispose();
		this.afterClosedSubject.next(result);
		this.afterClosedSubject.complete();
	}

	public afterClosed(): Observable<any> {
		return this.afterClosedSubject.asObservable();
	}
}
