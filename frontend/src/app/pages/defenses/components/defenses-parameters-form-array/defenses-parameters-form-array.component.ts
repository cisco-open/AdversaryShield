import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import {
	ControlContainer,
	FormArray,
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormErrorDisplayDirective } from '../../../../shared/directives/form-error-display/form-error-display.directive';

@Component({
	selector: 'as-defenses-parameters-form-array',
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		MatFormFieldModule,
		MatSelectModule,
		MatInputModule,
		MatCheckboxModule,
		FormErrorDisplayDirective,
		MatIconModule,
		MatButtonModule
	],
	templateUrl: './defenses-parameters-form-array.component.html',
	styleUrl: './defenses-parameters-form-array.component.scss',
	viewProviders: [
		{
			provide: ControlContainer,
			useFactory: () => inject(ControlContainer, { skipSelf: true })
		}
	]
})
export class DefensesParametersFormArrayComponent {
	readonly fb = inject(FormBuilder);
	readonly controlContainer = inject(ControlContainer);

	readonly controlKey = input.required<string>();

	get parentFormGroup() {
		return this.controlContainer.control as FormGroup;
	}

	get controlKeyFormArray(): FormArray {
		return this.parentFormGroup.get(this.controlKey()) as FormArray;
	}

	ngOnInit(): void {
		this.parentFormGroup.addControl(this.controlKey(), new FormArray([]));
	}

	addParameter() {
		this.controlKeyFormArray.push(this.newParameterFormGroup());
		console.log(this.parentFormGroup.getRawValue());
	}

	newParameterFormGroup(): FormGroup {
		return this.fb.group({
			type: ['', Validators.required],
			key: ['', Validators.required],
			isMandatory: [false, Validators.required],
			isReadOnly: [false, Validators.required],
			defaultValue: ['']
		});
	}

	removeParameter(index: number): void {
		this.controlKeyFormArray.removeAt(index);
	}
}
