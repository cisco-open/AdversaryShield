import { Parameter } from './parameter.interface';

export interface Defense {
	id: number;
	name: string;
	repoUrl: string;
	version: string;
	parameters: Parameter[];
}
