import { ReleasesResponseDTO, ReleaseWrapperDTO } from './releases-dto.interface';
import { Release } from './releases.interface';

export function convertReleaseToPostPayload(release: Release): ReleaseWrapperDTO {
	return {
		release: {
			name: release.name ?? '',
			namespace: release.namespace ?? '',
			revision: release.revision ?? '',
			status: release.status ?? 'unknown'
		}
	};
}

export function convertReleaseToPutPayload(release: Release): ReleaseWrapperDTO {
	return {
		release: {
			name: release.name ?? '',
			namespace: release.namespace ?? '',
			revision: release.revision ?? '',
			status: release.status ?? 'unknown'
		}
	};
}

export function convertReleasesToFrontend(response: ReleasesResponseDTO): Release[] {
	return response.releases.map((releaseWrapper: ReleaseWrapperDTO) => {
		const release = releaseWrapper.release;

		return {
			name: release?.name ?? 'Unnamed Release',
			namespace: release?.namespace ?? 'default',
			revision: release?.revision ?? '0',
			status: release?.status ?? 'unknown'
		};
	});
}

export function convertReleasesToBackend(releases: Release[]): ReleasesResponseDTO {
	return {
		releases: releases.map((release: Release) => ({
			release: {
				name: release.name ?? '',
				namespace: release.namespace ?? '',
				revision: release.revision ?? '',
				status: release.status ?? 'unknown'
			}
		}))
	};
}
