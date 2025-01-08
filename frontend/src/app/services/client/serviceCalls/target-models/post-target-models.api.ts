import { TargetModelWrapperDTO } from '../../models/target-models/target-model-dto.interface';
import { ServiceCallPOST } from '../service-call';

export class PostTargetModelsAPI extends ServiceCallPOST<any> {
	constructor(targetModel: TargetModelWrapperDTO) {
		super(`targetmodels`, targetModel);
	}
}
