import { DefenseWrapperDTO } from '../../models/defenses/defense-dto.interface';
import { ServiceCallPOST } from '../service-call';

export class PostReleaseAPI extends ServiceCallPOST<any> {
	constructor(defense: DefenseWrapperDTO) {
		super(`releases`, defense);
	}
}
