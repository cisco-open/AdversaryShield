import { TargetModelResponseDTO } from '../../models/target-models/target-model-dto.interface';
import { ServiceCallGET } from '../service-call';

export class GetTargetModelsAPI extends ServiceCallGET<TargetModelResponseDTO> {
	constructor() {
		super(`targetmodels`);
	}
}
