import { ServiceCallDELETE } from '../service-call';

export class DeleteTargetModelsAPI extends ServiceCallDELETE {
	constructor(id: string) {
		super(`targetmodels/${id}`);
	}
}
