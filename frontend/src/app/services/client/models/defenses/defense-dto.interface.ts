export interface DefenseResponseDTO {
	defenses: DefenseWrapperDTO[];
}

export interface DefenseWrapperDTO {
	defense?: DefenseDTO;
}

export interface DefenseDTO {
	id?: string;
	name?: string;
	repo_url?: string;
	version?: string;
	parameters?: ParameterWrapperDTO[];
}

export interface ParameterWrapperDTO {
	parameter?: ParameterDTO;
}

export interface ParameterDTO {
	id?: string;
	parameter_key?: string;
	parameter_type?: string;
	is_mandatory?: boolean;
	default_value?: any;
	is_read_only?: boolean;
}
