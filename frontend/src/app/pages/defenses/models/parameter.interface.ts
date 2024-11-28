export interface Parameter {
	id: number;
	parameterKey: string;
	parameterType: string;
	isMandatory: boolean;
	defaultValue: string;
	isReadOnly: boolean;
}
