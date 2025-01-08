import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { take } from 'rxjs';
import { convertDefenseToReleasePostPayload } from '../../services/client/models/defenses/defense-conversion.utils';
import { Defense } from '../../services/client/models/defenses/defense.interface';
import { convertReleasesToFrontend } from '../../services/client/models/releases/releases-conversion.utils';
import { ReleasesResponseDTO } from '../../services/client/models/releases/releases-dto.interface';
import { Release } from '../../services/client/models/releases/releases.interface';
import { DeleteReleaseByNameAPI } from '../../services/client/serviceCalls/releases/delete-releases.api';
import { GetReleasesAPI } from '../../services/client/serviceCalls/releases/get-releases.api';
import { PostReleaseAPI } from '../../services/client/serviceCalls/releases/post-releases.api';
import { PutReleasesAPI } from '../../services/client/serviceCalls/releases/put-releases.api';
import { CLIENT } from '../../services/services.tokens';
import { NotificationService } from '../../shared/components/notification/services/notification.service';

type ReleasesState = {
	releases: Release[];
	isLoading: boolean;
};

const initialState: ReleasesState = {
	releases: [],
	isLoading: false
};

export const ReleasesStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),
	withMethods((store, apiClient = inject(CLIENT), notificationService = inject(NotificationService)) => ({
		loadAll(): void {
			patchState(store, { isLoading: true });

			apiClient
				.serviceCall<ReleasesResponseDTO>(new GetReleasesAPI())
				.pipe(take(1))
				.subscribe((responseDTO: ReleasesResponseDTO) => {
					const releases = convertReleasesToFrontend(responseDTO);

					setTimeout(() => {
						patchState(store, { releases, isLoading: false });
					}, 200); // Ensures skeleton is shown at least for a brief moment
				});
		},
		createService(defense: Defense): void {
			const defenseDTO = convertDefenseToReleasePostPayload(defense);

			apiClient
				.serviceCall(new PostReleaseAPI(defenseDTO))
				.pipe(take(1))
				.subscribe(() => {
					notificationService.showSuccess('Release created.');
				});
		},
		upgradeRelease(releaseName: string): void {
			apiClient
				.serviceCall(new PutReleasesAPI(releaseName))
				.pipe(take(1))
				.subscribe(() => {
					notificationService.showSuccess('Release upgrade started.');
				});
		},
		removeByName(releaseName: string): void {
			apiClient
				.serviceCall(new DeleteReleaseByNameAPI(releaseName))
				.pipe(take(1))
				.subscribe(() => {
					notificationService.showSuccess('Release removed.');
				});
			patchState(store, {
				releases: store.releases().filter((release) => `${release.name}` !== `${releaseName}`)
			});
		}
	}))
);
