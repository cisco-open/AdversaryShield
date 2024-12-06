import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { take } from 'rxjs';
import {
	convertTargetModelsToFrontend,
	convertTargetModelToPutPayload
} from '../../services/client/models/target-models/target-model-conversion.utils';
import { TargetModelResponseDTO } from '../../services/client/models/target-models/target-model-dto.interface';
import { TargetModel } from '../../services/client/models/target-models/target-model.interface';
import { DeleteTargetModelsAPI } from '../../services/client/serviceCalls/target-models/delete-target-models.api';
import { GetTargetModelsAPI } from '../../services/client/serviceCalls/target-models/get-target-models.api';
import { PostTargetModelsAPI } from '../../services/client/serviceCalls/target-models/post-target-models.api';
import { PutTargetModelAPI } from '../../services/client/serviceCalls/target-models/put-target-models.api';
import { CLIENT } from '../../services/services.tokens';
import { NotificationService } from '../../shared/components/notification/services/notification.service';

type TargetModelsState = {
	targetModels: TargetModel[];
	isLoading: boolean;
};

const initialState: TargetModelsState = {
	targetModels: [],
	isLoading: false
};

export const TargetModelsStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),
	withMethods((store, apiClient = inject(CLIENT), notificationService = inject(NotificationService)) => ({
		loadAll(): void {
			patchState(store, { isLoading: true });

			apiClient
				.serviceCall<TargetModelResponseDTO>(new GetTargetModelsAPI())
				.pipe(take(1))
				.subscribe((response: TargetModelResponseDTO) => {
					const targetModels = convertTargetModelsToFrontend(response);
					patchState(store, { targetModels, isLoading: false });
				});
		},
		removeById(id: number): void {
			apiClient
				.serviceCall<TargetModelResponseDTO>(new DeleteTargetModelsAPI(`${id}`))
				.pipe(take(1))
				.subscribe(() => {
					notificationService.showSuccess('Target model removed.');
				});

			patchState(store, {
				targetModels: store.targetModels().filter((targetModel) => `${targetModel.id}` !== `${id}`)
			});
		},
		add(newTargetModel: TargetModel): void {
			const newTargetModelDTO = convertTargetModelToPutPayload(newTargetModel);

			apiClient
				.serviceCall(new PostTargetModelsAPI(newTargetModelDTO))
				.pipe(take(1))
				.subscribe((targetModel: any) => {
					notificationService.showSuccess('Target model added.');
				});
		},
		edit(updatedTargetModel: TargetModel): void {
			const updatedTargetModelDTO = convertTargetModelToPutPayload(updatedTargetModel);
			apiClient
				.serviceCall(new PutTargetModelAPI(updatedTargetModelDTO))
				.pipe(take(1))
				.subscribe(() => {
					notificationService.showSuccess('Target model updated.');
				});

			const targetModels = store.targetModels().map((targetModel) => {
				return targetModel.id === targetModel.id ? updatedTargetModel : targetModel;
			});

			patchState(store, { targetModels });
		}
	}))
);
