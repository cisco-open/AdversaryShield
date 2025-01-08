import { DefenseWrapperDTO } from '../../models/defenses/defense-dto.interface';
import { ServiceCallPOST } from '../service-call';

export class PostDefenseAPI extends ServiceCallPOST<any> {
	constructor(defense: DefenseWrapperDTO) {
		super(`defenses`, defense);
	}
}
