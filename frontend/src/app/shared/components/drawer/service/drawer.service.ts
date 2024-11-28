import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { inject, Injectable, Injector } from '@angular/core';
import { DrawerRef } from '../drawer.ref';
import { DRAWER_DATA } from '../drawer.tokens';
import { DEFAUlT_DRAWER_WIDTH } from '../models/constants/drawer.constants';
import { DrawerConfig } from '../models/interfaces/drawer-config.interface';

@Injectable()
export class DrawerService {
	readonly overlay = inject(Overlay);
	readonly injector = inject(Injector);

	open<T>(component: ComponentType<T>, config?: DrawerConfig): DrawerRef {
		const positionStrategy = this.overlay.position().global().right();

		const overlayRef = this.overlay.create({
			positionStrategy,
			hasBackdrop: true,
			backdropClass: 'drawer-backdrop',
			height: '100vh',
			...config
		});

		const drawerRef = new DrawerRef(overlayRef);

		const injector = Injector.create({
			parent: this.injector,
			providers: [
				{ provide: DrawerRef, useValue: drawerRef },
				{
					provide: DRAWER_DATA,
					useValue: {
						saveButtonLabel: 'Save',
						closeButtonLabel: 'Close',
						showSaveButton: true,
						showCloseButton: true,
						closeDialogOnBackdropClick: true,
						closeDialogOnEscKeyUp: true,
						width: config?.width || DEFAUlT_DRAWER_WIDTH,
						...config
					}
				}
			]
		});

		const portal = new ComponentPortal(component, null, injector);
		overlayRef.attach(portal);

		return drawerRef;
	}
}
