import { TargetModelResponseDTO, TargetModelWrapperDTO } from './target-model-dto.interface';
import { TargetModel } from './target-model.interface';

export function convertTargetModelToPostPayload(targetModel: TargetModel): TargetModelWrapperDTO {
	return {
		targetmodel: {
			model: targetModel.model ?? '',
			url: targetModel.url ?? '',
			method: targetModel.method ?? ''
		}
	};
}

export function convertTargetModelToPutPayload(targetModel: TargetModel): TargetModelWrapperDTO {
	return {
		targetmodel: {
			id: targetModel.id ?? 0,
			model: targetModel.model ?? '',
			url: targetModel.url ?? '',
			method: targetModel.method ?? ''
		}
	};
}

export function convertTargetModelsToFrontend(response: TargetModelResponseDTO): TargetModel[] {
	return response.targetmodels.map((targetModelWrapper: TargetModelWrapperDTO) => {
		const targetModel = targetModelWrapper.targetmodel;
		return {
			id: targetModel?.id ?? 0,
			model: targetModel?.model ?? 'Unnamed Model',
			url: targetModel?.url ?? '',
			method: targetModel?.method ?? ''
		};
	});
}

export function convertTargetModelsToBackend(targetModels: TargetModel[]): TargetModelResponseDTO {
	return {
		targetmodels: targetModels.map((targetModel: TargetModel) => ({
			targetmodel: {
				id: targetModel.id ?? 0,
				model: targetModel.model ?? '',
				url: targetModel.url ?? '',
				method: targetModel.method ?? ''
			}
		}))
	};
}
