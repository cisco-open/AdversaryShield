import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { DefensesService } from './defenses.service';
import { Defense } from './models/defense.interface';

type DefensesState = {
	defenses: Defense[];
	isLoading: boolean;
};

const initialState: DefensesState = {
	defenses: [],
	isLoading: false
};

export const DefensesStore = signalStore(
	{ providedIn: 'root' },
	withState(initialState),
	withMethods((store, defensesService = inject(DefensesService)) => ({
		async loadAll(): Promise<void> {
			patchState(store, { isLoading: true });

			const defenses = await defensesService.getAll();

			patchState(store, { defenses, isLoading: false });
		},
		async removeById(id: number): Promise<void> {
			await defensesService.removeDefenseById(id);

			patchState(store, {
				defenses: store.defenses().filter((defense) => defense.id !== id)
			});
		},
		async add(newDefense: Defense): Promise<void> {
			const addedDefense = await defensesService.addDefense(newDefense);

			patchState(store, {
				defenses: [...store.defenses(), addedDefense]
			});
		},
		async edit(updatedDefense: Defense): Promise<void> {
			const editedDefense = await defensesService.editDefense(updatedDefense);

			const defenses = store.defenses().map((defense) => {
				return defense.id === editedDefense.id ? editedDefense : defense;
			});

			patchState(store, { defenses });
		}
	}))
);
