import { DefenseResponseDTO } from '../../models/defenses/defense-dto.interface';
import { ServiceCallGET } from '../service-call';

export class GetDefensesAPI extends ServiceCallGET<DefenseResponseDTO> {
	constructor() {
		super(`defenses`);
	}
}
