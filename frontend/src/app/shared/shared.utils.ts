export const generateRandomID = (): number => {
	return Math.floor(Math.random() * 1000000);
};

export function isEmptyObject(obj: any): boolean {
	return (
		(obj === undefined || Object.prototype.toString.call(obj) === '[object Object]') &&
		Object.keys(obj || {}).length === 0
	);
}

export function isNil(obj: any): boolean {
	return obj === null || obj === undefined;
}

export function isNilOrEmptyString(obj: any): boolean {
	return obj === null || obj === undefined || obj === '';
}

export function isEmptyArray(obj: any): boolean {
	return Array.isArray(obj) && obj.length === 0;
}

export const toTitleCase = (str: string) =>
	str
		.toLowerCase()
		.split('_')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ');
