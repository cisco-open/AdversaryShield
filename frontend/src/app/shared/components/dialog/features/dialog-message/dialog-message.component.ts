import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DialogConfig, DialogRef, DialogStatus } from '../..';
import { DialogComponent } from '../../component/dialog.component';
import { DIALOG_DATA } from '../../dialog.tokens';
import { DialogMessageTypeEnum } from '../../models/enums/dialog-message-type.enum';
import { DialogMessageConfig } from '../../models/interfaces/dialog-message-config.interface';

@Component({
	selector: 'as-dialog-message',
	imports: [CommonModule, DialogComponent, MatButtonModule, MatIconModule],
	templateUrl: './dialog-message.component.html',
	styleUrl: './dialog-message.component.scss'
})
export class DialogMessageComponent {
	readonly dialogData = inject<DialogConfig<DialogMessageConfig>>(DIALOG_DATA);
	readonly dialogRef = inject(DialogRef);

	readonly DialogMessageTypeEnum: typeof DialogMessageTypeEnum = DialogMessageTypeEnum;

	readonly data = this.dialogData.data || ({} as DialogMessageConfig);

	save(status: DialogStatus): void {
		this.dialogRef.close({ status });
	}
}
