import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { inject, Injectable, Injector } from '@angular/core';
import { DialogRef } from '../dialog.ref';
import { DIALOG_DATA } from '../dialog.tokens';
import { DEFAULT_DIALOG_HEIGHT, DEFAULT_DIALOG_WIDTH } from '../models/constants/dialog.constants';
import { DialogConfig } from '../models/interfaces/dialog-config.interface';

@Injectable()
export class DialogService {
	readonly overlay = inject(Overlay);
	readonly injector = inject(Injector);

	open<T>(component: ComponentType<T>, config?: DialogConfig<unknown>): DialogRef {
		const positionStrategy = this.overlay.position().global().centerHorizontally().centerVertically();

		const overlayRef = this.overlay.create({
			positionStrategy,
			hasBackdrop: true,
			backdropClass: 'dialog-backdrop',
			...config
		});

		const dialogRef = new DialogRef(overlayRef);

		const injector = Injector.create({
			parent: this.injector,
			providers: [
				{ provide: DialogRef, useValue: dialogRef },
				{
					provide: DIALOG_DATA,
					useValue: {
						saveButtonLabel: 'Save',
						closeButtonLabel: 'Close',
						showSaveButton: true,
						showCloseButton: true,
						showHeader: true,
						showFooter: true,
						buttonPosition: 'right',
						closeDialogOnBackdropClick: true,
						closeDialogOnEscKeyUp: true,
						width: config?.width || DEFAULT_DIALOG_WIDTH,
						height: config?.height || DEFAULT_DIALOG_HEIGHT,
						...config
					} as DialogConfig
				}
			]
		});

		const portal = new ComponentPortal(component, null, injector);
		overlayRef.attach(portal);

		return dialogRef;
	}
}
