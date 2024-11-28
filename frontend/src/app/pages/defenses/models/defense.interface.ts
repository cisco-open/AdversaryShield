import { Parameter } from './parameter.interface';

export interface Defense {
	id: string;
	name: string;
	repoUrl: string;
	version: string;
	parameters: Parameter[];
}
