import { AbstractControl, ValidatorFn } from '@angular/forms';

export const MIN_DATE_VALIDATOR_IDENTIFIER: string = 'minDate';

export function minDateValidator(minDate: string): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		const controlDate = new Date(control.value);
		const minDateValue = new Date(minDate);

		if (control.value && controlDate < minDateValue) {
			return { minDate: { requiredDate: minDate, actualDate: control.value } };
		}
		return null;
	};
}
