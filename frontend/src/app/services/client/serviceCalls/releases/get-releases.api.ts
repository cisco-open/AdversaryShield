import { ReleasesResponseDTO } from '../../models/releases/releases-dto.interface';
import { ServiceCallGET } from '../service-call';

export class GetReleasesAPI extends ServiceCallGET<ReleasesResponseDTO> {
	constructor() {
		super(`releases`);
	}
}
