import { AbstractControl, ValidatorFn } from '@angular/forms';

export const URL_VALIDATOR_IDENTIFIER: string = 'url';

export function urlValidator(): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		const value = control.value;

		if (!value) {
			return null;
		}

		// Regex for basic URL validation
		const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;

		if (!urlPattern.test(value)) {
			return { [URL_VALIDATOR_IDENTIFIER]: { actual: value } };
		}

		return null;
	};
}
