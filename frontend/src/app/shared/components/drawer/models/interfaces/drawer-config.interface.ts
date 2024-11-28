import { OverlayConfig } from '@angular/cdk/overlay';
import { DrawerActionTypeEnum } from '../enums/drawer-action-type.enum';
import { DrawerStatus } from '../enums/drawer-status.enum';
import { DrawerCSSSize } from '../types/drawer-css-size.type';

export interface DrawerConfig extends OverlayConfig {
	data?: any;
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

export interface DrawerClose<T> {
	result?: T;
	status: DrawerStatus;
}
