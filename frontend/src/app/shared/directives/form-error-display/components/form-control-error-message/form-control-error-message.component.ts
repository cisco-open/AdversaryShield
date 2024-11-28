import { Component, Input } from '@angular/core';
import { MatError } from '@angular/material/form-field';

@Component({
	selector: 'form-control-error-message',
	templateUrl: './form-control-error-message.component.html',
	styleUrls: ['./form-control-error-message.component.scss'],
	standalone: true,
	imports: [MatError]
})
export class FormControlErrorMessageComponent {
	@Input() text?: string;

	constructor() {}
}
