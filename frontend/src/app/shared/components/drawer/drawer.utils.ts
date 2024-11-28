import { DrawerCSSSize } from './models/types/drawer-css-size.type';
import { DrawerCSSUnit } from './models/types/drawer-css-unit.type';

/**
 * Generate style object for the dialog width and height based on provided units.
 * Supports px, %, vw, vh, rem, and em.
 *
 * @param width - The width as a CSSSize string (e.g., '100px', '50%')
 * @returns An object containing the styles for width and height
 */
export const getDrawerSizeStyles = (width?: DrawerCSSSize): { [klass: string]: any } => {
	const styles: { [klass: string]: any } = {};

	if (width) {
		applySizeStyle(styles, width, 'width');
	}

	return styles;
};

/**
 * Helper function to apply the size style (width/height) based on the value provided.
 *
 * @param styles - The style object to which styles are added
 * @param value - The CSSSize value (e.g., '100px', '20rem', '80vh')
 * @param dimension - Either 'width' or 'height'
 */
const applySizeStyle = (styles: { [klass: string]: any }, value: DrawerCSSSize, dimension: 'width'): void => {
	const unit = extractUnit(value);

	if (unit === 'px' || unit === 'rem' || unit === 'em') {
		styles[`${dimension}.${unit}`] = parseFloat(value);
	} else {
		styles[dimension] = value;
	}
};

/**
 * Extracts the CSS unit from the given CSSSize value.
 *
 * @param value - The CSSSize value (e.g., '100px', '20rem', '80vh')
 * @returns The unit (e.g., 'px', 'rem', 'vh') or 'px' as default
 */
const extractUnit = (value: DrawerCSSSize): DrawerCSSUnit => {
	const valueAsString = typeof value === 'string' ? value : '';
	const match = valueAsString.match(/(px|rem|em|vw|vh|%)$/);
	return match ? (match[0] as DrawerCSSUnit) : 'px';
};
