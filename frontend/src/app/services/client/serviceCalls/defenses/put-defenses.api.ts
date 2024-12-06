import { DefenseWrapperDTO } from '../../models/defenses/defense-dto.interface';
import { ServiceCallPUT } from '../service-call';

export class PutDefensesAPI extends ServiceCallPUT {
	constructor(defense: DefenseWrapperDTO) {
		super(`defenses/${defense.defense?.id}`, defense);
	}
}
