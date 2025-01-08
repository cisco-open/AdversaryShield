import { ServiceCallPUT } from '../service-call';

export class PutReleasesAPI extends ServiceCallPUT {
	constructor(releaseName: string) {
		super(`releases/${releaseName}`, {});
	}
}
