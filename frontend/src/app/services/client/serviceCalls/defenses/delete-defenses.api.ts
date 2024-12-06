import { ServiceCallDELETE } from '../service-call';

export class DeleteDefensesAPI extends ServiceCallDELETE {
	constructor(id: string) {
		super(`defenses/${id}`);
	}
}
