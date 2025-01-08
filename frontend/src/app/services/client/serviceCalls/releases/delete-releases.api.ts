import { ServiceCallDELETE } from '../service-call';

export class DeleteReleaseByNameAPI extends ServiceCallDELETE {
	constructor(releaseName: string) {
		super(`releases/${releaseName}`);
	}
}
