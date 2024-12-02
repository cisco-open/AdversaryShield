import { OverlayConfig } from '@angular/cdk/overlay';
import { DialogActionTypeEnum } from '../enums/dialog-action-type.enum';
import { DialogButtonPositionEnum } from '../enums/dialog-button-position.enum';
import { DialogStatus } from '../enums/dialog-status.enum';
import { DialogCSSSize } from '../types/dialog-css-size.type';

export interface DialogConfig<T = unknown> extends OverlayConfig {
	data?: T;
	title?: string;
	showSaveButton?: boolean;
	showCloseButton?: boolean;
	saveButtonLabel?: string;
	closeButtonLabel?: string;
	buttonPosition?: DialogButtonPositionEnum;
	showHeader?: boolean;
	showFooter?: boolean;
	closeDialogOnBackdropClick?: boolean;
	closeDialogOnEscKeyUp?: boolean;
	width?: DialogCSSSize;
	height?: DialogCSSSize;
	actionType?: DialogActionTypeEnum;
}

export interface DialogClose<T = unknown> {
	result?: T;
	status: DialogStatus;
}
