import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TargetModel } from '../../../../services/client/models/target-models/target-model.interface';
import { DRAWER_DATA, DrawerComponent, DrawerRef, DrawerStatus } from '../../../../shared/components/drawer';
import { DrawerActionTypeEnum } from '../../../../shared/components/drawer/models/enums/drawer-action-type.enum';
import { FormErrorDisplayDirective } from '../../../../shared/directives/form-error-display/form-error-display.directive';
import { urlValidator } from '../../../../shared/directives/form-error-display/validators/url.validator';

@Component({
	selector: 'as-target-model-actions-drawer',
	imports: [
		DrawerComponent,
		FormsModule,
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule,
		FormErrorDisplayDirective,
		MatSelectModule
	],
	templateUrl: './target-model-actions-drawer.component.html',
	styleUrl: './target-model-actions-drawer.component.scss'
})
export class TargetModelActionsDrawerComponent implements OnInit {
	readonly drawerRef = inject(DrawerRef);
	readonly drawerConfig = inject(DRAWER_DATA);
	readonly fb = inject(FormBuilder);

	form: FormGroup = new FormGroup({});

	availableMethods: string[] = ['GET', 'POST', 'PUT', 'DELETE'];

	ngOnInit(): void {
		this.initForm();
		this.configureDrawerBasedOnType();
	}

	initForm() {
		this.form = this.fb.group({
			model: [null, Validators.required],
			url: [null, [Validators.required, urlValidator()]],
			method: [null, Validators.required]
		});
	}

	configureDrawerBasedOnType() {
		switch (this.drawerConfig.actionType) {
			case DrawerActionTypeEnum.EDIT:
				this.configureEditActions();
				break;
		}
	}

	private configureEditActions() {
		const targetModel: TargetModel = this.drawerConfig.data;
		this.form.patchValue(targetModel);
	}

	save(status: DrawerStatus): void {
		if (status !== DrawerStatus.SAVE) {
			return;
		}

		const targetModel: TargetModel = this.form.getRawValue();
		this.drawerRef.close({
			result: { ...targetModel },
			status
		});
	}
}
