export interface TargetModelResponseDTO {
	targetmodels: TargetModelWrapperDTO[];
}

export interface TargetModelWrapperDTO {
	targetmodel?: TargetModelDTO;
}

export interface TargetModelDTO {
	id?: number;
	model?: string;
	url?: string;
	method?: string;
}
