import { inject, Injectable } from '@angular/core';
import {
	DIALOG_MESSAGE_DEFAULT_HEIGHT,
	DIALOG_MESSAGE_DEFAULT_WIDTH
} from '../../../models/constants/dialog-message.constants';
import { DialogButtonPositionEnum } from '../../../models/enums/dialog-button-position.enum';
import { DialogMessageTypeEnum } from '../../../models/enums/dialog-message-type.enum';
import { DialogConfig } from '../../../models/interfaces/dialog-config.interface';
import { DialogMessageConfig } from '../../../models/interfaces/dialog-message-config.interface';
import { DialogService } from '../../../service/dialog.service';
import { DialogMessageComponent } from '../dialog-message.component';

@Injectable()
export class DialogMessageService {
	private readonly dialogService = inject(DialogService);

	private mergeConfigs(
		defaultConfig: DialogConfig<DialogMessageConfig>,
		overrideConfig?: Partial<DialogConfig<DialogMessageConfig>>
	): DialogConfig<DialogMessageConfig> {
		return {
			...defaultConfig,
			...overrideConfig,
			data: {
				...defaultConfig.data,
				...overrideConfig?.data
			}
		};
	}

	openWarningDialog(
		dialogMessageConfig: DialogMessageConfig,
		overrideConfig?: Partial<DialogConfig<DialogMessageConfig>>
	) {
		const defaultConfig: DialogConfig<DialogMessageConfig> = {
			data: {
				message: dialogMessageConfig.message,
				type: DialogMessageTypeEnum.WARNING
			},
			showSaveButton: true,
			showCloseButton: true,
			saveButtonLabel: 'Yes',
			closeButtonLabel: 'Cancel',
			buttonPosition: DialogButtonPositionEnum.SPREAD,
			showHeader: false,
			width: DIALOG_MESSAGE_DEFAULT_WIDTH,
			height: DIALOG_MESSAGE_DEFAULT_HEIGHT
		};

		const finalConfig = this.mergeConfigs(defaultConfig, overrideConfig);
		return this.dialogService.open(DialogMessageComponent, finalConfig);
	}

	openSuccessDialog(
		dialogMessageConfig: DialogMessageConfig,
		overrideConfig?: Partial<DialogConfig<DialogMessageConfig>>
	) {
		const defaultConfig: DialogConfig<DialogMessageConfig> = {
			data: {
				message: dialogMessageConfig.message,
				type: DialogMessageTypeEnum.SUCCESS
			},
			showSaveButton: false,
			showCloseButton: true,
			closeButtonLabel: 'Close',
			showHeader: false,
			width: DIALOG_MESSAGE_DEFAULT_WIDTH,
			height: DIALOG_MESSAGE_DEFAULT_HEIGHT
		};

		const finalConfig = this.mergeConfigs(defaultConfig, overrideConfig);
		return this.dialogService.open(DialogMessageComponent, finalConfig);
	}

	openInfoDialog(
		dialogMessageConfig: DialogMessageConfig,
		overrideConfig?: Partial<DialogConfig<DialogMessageConfig>>
	) {
		const defaultConfig: DialogConfig<DialogMessageConfig> = {
			data: {
				message: dialogMessageConfig.message,
				type: DialogMessageTypeEnum.INFO
			},
			showSaveButton: false,
			showCloseButton: true,
			closeButtonLabel: 'Close',
			showHeader: false,
			width: DIALOG_MESSAGE_DEFAULT_WIDTH,
			height: DIALOG_MESSAGE_DEFAULT_HEIGHT
		};

		const finalConfig = this.mergeConfigs(defaultConfig, overrideConfig);
		return this.dialogService.open(DialogMessageComponent, finalConfig);
	}

	openErrorDialog(
		dialogMessageConfig: DialogMessageConfig,
		overrideConfig?: Partial<DialogConfig<DialogMessageConfig>>
	) {
		const defaultConfig: DialogConfig<DialogMessageConfig> = {
			data: {
				message: dialogMessageConfig.message,
				type: DialogMessageTypeEnum.ERROR
			},
			showSaveButton: false,
			showCloseButton: true,
			closeButtonLabel: 'Close',
			showHeader: false,
			width: DIALOG_MESSAGE_DEFAULT_WIDTH,
			height: DIALOG_MESSAGE_DEFAULT_HEIGHT
		};

		const finalConfig = this.mergeConfigs(defaultConfig, overrideConfig);
		return this.dialogService.open(DialogMessageComponent, finalConfig);
	}
}
