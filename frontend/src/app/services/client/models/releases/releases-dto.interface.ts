export interface ReleasesResponseDTO {
	releases: ReleaseWrapperDTO[];
}

export interface ReleaseWrapperDTO {
	release?: ReleaseDTO;
}

export interface ReleaseDTO {
	name?: string;
	namespace?: string;
	revision?: string;
	status?: string;
}
