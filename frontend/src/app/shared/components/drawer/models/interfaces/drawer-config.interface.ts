import { OverlayConfig } from '@angular/cdk/overlay';
import { DrawerActionTypeEnum } from '../enums/drawer-action-type.enum';
import { DrawerStatus } from '../enums/drawer-status.enum';
import { DrawerCSSSize } from '../types/drawer-css-size.type';

export interface DrawerConfig<T = unknown> extends OverlayConfig {
	data?: T;
	title?: string;
	showSaveButton?: boolean;
	showCloseButton?: boolean;
	saveButtonLabel?: string;
	closeButtonLabel?: string;
	closeDialogOnBackdropClick?: boolean;
	closeDialogOnEscKeyUp?: boolean;
	width?: DrawerCSSSize;
	actionType?: DrawerActionTypeEnum;
}

export interface DrawerClose<T = unknown> {
	result?: T;
	status: DrawerStatus;
}
