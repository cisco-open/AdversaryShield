import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Defense, Parameter } from '../../../services/client/models/defenses/defense.interface';
import { isNil } from '../../../shared/shared.utils';

@Injectable()
export class ReleasesStateService {
	private selectedDefenseSubject = new BehaviorSubject<Defense | null>(null);
	private parametersSubject = new BehaviorSubject<Parameter[]>([]);

	selectedDefense$: Observable<Defense | null> = this.selectedDefenseSubject.asObservable();
	parameters$: Observable<Parameter[]> = this.parametersSubject.asObservable();

	selectDefense(defense: Defense | null) {
		if (isNil(defense)) {
			this.parametersSubject.next([]);
			this.selectedDefenseSubject.next(null);
			return;
		}

		this.selectedDefenseSubject.next(defense);
		this.parametersSubject.next(defense!.parameters ?? []);
	}
}
