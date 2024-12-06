export interface Defense {
	id?: string;
	name?: string;
	repoUrl?: string;
	version?: string;
	parameters?: Parameter[];
}

export interface Parameter {
	id?: string;
	parameterKey?: string;
	parameterType?: string;
	isMandatory?: boolean;
	defaultValue?: any;
	isReadOnly?: boolean;
}
