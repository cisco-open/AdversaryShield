import { AbstractControl, ValidatorFn } from '@angular/forms';

export const UNIQUE_NAME_VALIDATOR_IDENTIFIER: string = 'uniqueName';

export function uniqueNameValidator(existingNames: string[]): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		const value = control.value?.trim().toLowerCase();
		if (value && existingNames.map((name) => name.toLowerCase()).includes(value)) {
			return { uniqueName: true };
		}
		return null;
	};
}
