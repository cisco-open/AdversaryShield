import { Injectable } from '@angular/core';
import { Defense } from './models/defense.interface';

export const DEFENSES_MOCK_DATA: Defense[] = [
	{
		id: 1,
		name: 'Defense 1',
		repoUrl: 'www.defense1.cisco.com',
		version: '4',
		parameters: [
			{
				id: 1,
				parameterKey: 'def1_key',
				parameterType: 'string',
				isMandatory: true,
				defaultValue: 'abc',
				isReadOnly: false
			},
			{
				id: 2,
				parameterKey: 'def2_key',
				parameterType: 'string',
				isMandatory: false,
				defaultValue: '',
				isReadOnly: false
			},
			{
				id: 3,
				parameterKey: 'def3_key',
				parameterType: 'string',
				isMandatory: true,
				defaultValue: '',
				isReadOnly: true
			}
		]
	},
	{
		id: 2,
		name: 'Defense 2',
		repoUrl: 'www.defense2.cisco.com',
		version: '2',
		parameters: [
			{
				id: 445,
				parameterKey: '2_defense',
				parameterType: 'integer',
				isMandatory: true,
				defaultValue: '',
				isReadOnly: true
			}
		]
	}
];

@Injectable({
	providedIn: 'root'
})
export class DefensesService {
	constructor() {}

	async getAll(): Promise<Defense[]> {
		return await Promise.resolve(DEFENSES_MOCK_DATA);
	}

	async removeDefenseById(id: number): Promise<any> {
		return await Promise.resolve({});
	}

	async addDefense(newDefense: Omit<Defense, 'id'>): Promise<Defense> {
		const id = Math.floor(Math.random() * 10000) + 1;
		return await Promise.resolve({ ...newDefense, id });
	}

	async editDefense(updatedDefense: Defense): Promise<Defense> {
		return await Promise.resolve(updatedDefense);
	}
}
