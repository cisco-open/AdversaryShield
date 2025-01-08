import { Release } from '../../services/client/models/releases/releases.interface';

export const mockReleases: Release[] = [
	{
		name: 'Defense 1',
		namespace: 'Namespace A',
		revision: 'v1.0',
		status: 'Active'
	},
	{
		name: 'Defense No Params',
		namespace: 'Namespace B',
		revision: 'v2.0',
		status: 'Inactive'
	},
	{
		name: 'Defense One Param',
		namespace: 'Namespace C',
		revision: 'v3.1',
		status: 'Active'
	}
];
