import { AbstractControl, ValidatorFn } from '@angular/forms';

export const MAX_DATE_VALIDATOR_IDENTIFIER: string = 'maxDate';

export function maxDateValidator(maxDate: string): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		const controlDate = new Date(control.value);
		const maxDateValue = new Date(maxDate);

		if (control.value && controlDate > maxDateValue) {
			return { maxDate: { requiredDate: maxDate, actualDate: control.value } };
		}
		return null;
	};
}
