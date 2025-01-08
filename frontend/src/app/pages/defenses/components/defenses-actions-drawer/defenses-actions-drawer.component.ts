import { AfterViewInit, Component, inject, OnInit, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Defense } from '../../../../services/client/models/defenses/defense.interface';
import { DRAWER_DATA, DrawerComponent, DrawerRef, DrawerStatus } from '../../../../shared/components/drawer';
import { DrawerActionTypeEnum } from '../../../../shared/components/drawer/models/enums/drawer-action-type.enum';
import { FormErrorDisplayDirective } from '../../../../shared/directives/form-error-display/form-error-display.directive';
import { uniqueNameValidator } from '../../../../shared/directives/form-error-display/validators/unique-name.validator';
import { urlValidator } from '../../../../shared/directives/form-error-display/validators/url.validator';
import { DefensesParametersFormArrayComponent } from '../defenses-parameters-form-array/defenses-parameters-form-array.component';

@Component({
	selector: 'as-defenses-actions-drawer',
	imports: [
		DrawerComponent,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		DefensesParametersFormArrayComponent,
		FormErrorDisplayDirective
	],
	templateUrl: './defenses-actions-drawer.component.html',
	styleUrl: './defenses-actions-drawer.component.scss'
})
export class DefensesActionsDrawerComponent implements OnInit, AfterViewInit {
	readonly drawerRef = inject(DrawerRef);
	readonly drawerConfig = inject(DRAWER_DATA);
	readonly fb = inject(FormBuilder);

	panelParameters = viewChild<DefensesParametersFormArrayComponent>('panelParameters');

	form: FormGroup = new FormGroup({});

	ngOnInit(): void {
		this.initForm();
	}

	ngAfterViewInit(): void {
		this.configureDrawerBasedOnType();
	}

	configureDrawerBasedOnType() {
		switch (this.drawerConfig.actionType) {
			case DrawerActionTypeEnum.EDIT:
			case DrawerActionTypeEnum.VIEW:
				this.configureEditOrViewTypeActions();
				break;
		}
	}

	initForm() {
		this.form = this.fb.group({
			name: [null, Validators.required],
			repoUrl: [null, [Validators.required, urlValidator()]]
		});

		if (this.drawerConfig.actionType === DrawerActionTypeEnum.ADD) {
			const defensesList: Defense[] = this.drawerConfig.data?.defensesList || [];
			const allDefenseNames = defensesList.map((def) => def.name || '');
			const nameControl = this.form.get('name');
			nameControl?.addValidators(uniqueNameValidator(allDefenseNames));
			nameControl?.updateValueAndValidity();
		}
	}

	private configureEditOrViewTypeActions() {
		const defense: Defense = this.drawerConfig.data;

		this.form.patchValue({
			name: defense.name,
			repoUrl: defense.repoUrl
		});

		defense?.parameters?.forEach((param) => {
			this.panelParameters()?.addParameter(param);
		});

		if (this.drawerConfig.actionType === DrawerActionTypeEnum.EDIT) {
			this.form.get('name')?.disable();
		}

		if (this.drawerConfig.actionType === DrawerActionTypeEnum.VIEW) {
			this.form.disable();
		}
	}

	save(status: DrawerStatus): void {
		if (status !== DrawerStatus.SAVE) {
			return;
		}

		const defense: Defense = this.form.getRawValue();
		this.drawerRef.close({
			result: { ...defense },
			status
		});
	}
}
