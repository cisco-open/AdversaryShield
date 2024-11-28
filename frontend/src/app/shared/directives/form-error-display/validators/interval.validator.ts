import { AbstractControl, ValidatorFn } from '@angular/forms';

export const INTERVAL_VALIDATOR_IDENTIFIER: string = 'interval';

export function intervalValidator(interval: [number, number]): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		const value = control.value;

		if (value === null || value === undefined) {
			return null; // Allow empty or non-numeric values, other validators like 'required' should handle this
		}

		const [min, max] = interval;

		if (value < min || value > max) {
			return { interval: { min, max, actual: value } };
		}

		return null;
	};
}
