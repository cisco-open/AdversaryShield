import { TargetModelWrapperDTO } from '../../models/target-models/target-model-dto.interface';
import { ServiceCallPUT } from '../service-call';

export class PutTargetModelAPI extends ServiceCallPUT {
	constructor(targetModel: TargetModelWrapperDTO) {
		super(`targetmodels/${targetModel.targetmodel?.id}`, targetModel);
	}
}
