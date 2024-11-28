import { AbstractControl, ValidatorFn } from '@angular/forms';

export const COMMA_SEPARATED_VALUES_VALIDATOR_IDENTIFIER: string = 'commaSeparatedValues';

export function commaSeparatedValuesValidator(): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		const { value } = control;
		if (!value) {
			return null;
		}

		// Regular expression to match comma-separated values (integers)
		const reg = /^(\d+)(,\d+)*$/;
		if (reg.test(value) === false) {
			return { [COMMA_SEPARATED_VALUES_VALIDATOR_IDENTIFIER]: { actual: value } };
		}

		return null;
	};
}
