import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { take } from 'rxjs';
import {
	convertDefenseToFrontend,
	convertDefenseToPostPayload,
	convertDefenseToPutPayload
} from '../../services/client/models/defenses/defense-conversion.utils';
import { DefenseResponseDTO } from '../../services/client/models/defenses/defense-dto.interface';
import { Defense } from '../../services/client/models/defenses/defense.interface';
import { DeleteDefensesAPI } from '../../services/client/serviceCalls/defenses/delete-defenses.api';
import { GetDefensesAPI } from '../../services/client/serviceCalls/defenses/get-defenses.api';
import { PostDefenseAPI } from '../../services/client/serviceCalls/defenses/post-defense.api';
import { PutDefensesAPI } from '../../services/client/serviceCalls/defenses/put-defenses.api';
import { CLIENT } from '../../services/services.tokens';
import { NotificationService } from '../../shared/components/notification/services/notification.service';

type DefensesState = {
	defenses: Defense[];
	isLoading: boolean;
};

const initialState: DefensesState = {
	defenses: [],
	isLoading: false
};

export const DefensesStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),
	withMethods((store, apiClient = inject(CLIENT), notificationService = inject(NotificationService)) => ({
		loadAll(): void {
			patchState(store, { isLoading: true });
			apiClient
				.serviceCall<DefenseResponseDTO>(new GetDefensesAPI())
				.pipe(take(1))
				.subscribe((response: DefenseResponseDTO) => {
					const defenses = convertDefenseToFrontend(response);

					setTimeout(() => {
						patchState(store, { defenses, isLoading: false });
					}, 200); // Ensures skeleton is shown at least for a brief moment
				});
		},
		removeById(id: number): void {
			apiClient
				.serviceCall<DefenseResponseDTO>(new DeleteDefensesAPI(`${id}`))
				.pipe(take(1))
				.subscribe(() => {
					notificationService.showSuccess('Defense removed.');
				});
			patchState(store, {
				defenses: store.defenses().filter((defense) => `${defense.id}` !== `${id}`)
			});
		},
		add(newDefense: Defense): void {
			const newDefenseDTO = convertDefenseToPostPayload(newDefense);
			apiClient
				.serviceCall(new PostDefenseAPI(newDefenseDTO))
				.pipe(take(1))
				.subscribe((defense: any) => {
					notificationService.showSuccess('Defense added.');
				});
		},
		edit(updatedDefense: Defense): void {
			const updatedDefenseDto = convertDefenseToPutPayload(updatedDefense);
			apiClient
				.serviceCall(new PutDefensesAPI(updatedDefenseDto))
				.pipe(take(1))
				.subscribe(() => {
					notificationService.showSuccess('Defense updated.');
				});

			const defenses = store.defenses().map((defense) => {
				return defense.id === updatedDefense.id ? updatedDefense : defense;
			});

			patchState(store, { defenses });
		}
	}))
);
