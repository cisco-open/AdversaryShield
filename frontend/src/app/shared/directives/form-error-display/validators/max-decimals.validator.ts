import { AbstractControl, ValidatorFn } from '@angular/forms';

export const MAX_DECIMALS_VALIDATOR_IDENTIFIER: string = 'maxDecimals';

export function maxDecimalsValidator(maxDecimals: number): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		if (!control.value || isNaN(control.value)) {
			return null;
		}

		const value = control.value.toString();
		const decimalPart = value.split('.')[1];

		if (decimalPart && decimalPart.length > maxDecimals) {
			return { maxDecimals: { requiredDecimals: maxDecimals, actualDecimals: decimalPart.length } };
		}

		return null;
	};
}
