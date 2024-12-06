import { DefenseResponseDTO, DefenseWrapperDTO, ParameterWrapperDTO } from './defense-dto.interface';
import { Defense, Parameter } from './defense.interface';

export function convertDefenseToPostPayload(defense: Defense): DefenseWrapperDTO {
	return {
		defense: {
			name: defense.name ?? '',
			repo_url: defense.repoUrl ?? '',
			version: defense.version ?? '0.0.0',
			parameters: (defense.parameters ?? []).map((parameter: Parameter) => ({
				parameter: {
					parameter_key: parameter.parameterKey ?? '',
					parameter_type: parameter.parameterType ?? '',
					is_mandatory: parameter.isMandatory ?? false,
					default_value: parameter.defaultValue ?? null,
					is_read_only: parameter.isReadOnly ?? false
				}
			}))
		}
	};
}

export function convertDefenseToPutPayload(defense: Defense): DefenseWrapperDTO {
	return {
		defense: {
			id: defense.id ?? '',
			name: defense.name ?? '',
			repo_url: defense.repoUrl ?? '',
			version: defense.version ?? '0.0.0',
			parameters: (defense.parameters ?? []).map((parameter: Parameter) => ({
				parameter: {
					id: parameter.id ?? '',
					parameter_key: parameter.parameterKey ?? '',
					parameter_type: parameter.parameterType ?? '',
					is_mandatory: parameter.isMandatory ?? false,
					default_value: parameter.defaultValue ?? null,
					is_read_only: parameter.isReadOnly ?? false
				}
			}))
		}
	};
}

export function convertDefenseToFrontend(response: DefenseResponseDTO): Defense[] {
	return response.defenses.map((defenseWrapper: DefenseWrapperDTO) => {
		const defense = defenseWrapper.defense;

		return {
			id: defense?.id ?? '',
			name: defense?.name ?? 'Unnamed Defense',
			repoUrl: defense?.repo_url ?? '',
			version: defense?.version ?? '0.0.0',
			parameters: (defense?.parameters ?? []).map((paramWrapper: ParameterWrapperDTO) => {
				const parameter = paramWrapper.parameter;
				return {
					id: parameter?.id ?? '',
					parameterKey: parameter?.parameter_key ?? 'unknownKey',
					parameterType: parameter?.parameter_type ?? 'unknownType',
					isMandatory: parameter?.is_mandatory ?? false,
					defaultValue: parameter?.default_value ?? null,
					isReadOnly: parameter?.is_read_only ?? false
				};
			})
		};
	});
}

export function convertDefenseToBackend(defenses: Defense[]): DefenseResponseDTO {
	return {
		defenses: defenses.map((defense: Defense) => ({
			defense: {
				id: defense.id ?? '',
				name: defense.name ?? '',
				repo_url: defense.repoUrl ?? '',
				version: defense.version ?? '0.0.0',
				parameters: (defense.parameters ?? []).map((parameter: Parameter) => ({
					parameter: {
						id: parameter.id ?? '',
						parameter_key: parameter.parameterKey ?? '',
						parameter_type: parameter.parameterType ?? '',
						is_mandatory: parameter.isMandatory ?? false,
						default_value: parameter.defaultValue ?? null,
						is_read_only: parameter.isReadOnly ?? false
					}
				}))
			}
		}))
	};
}
