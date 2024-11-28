import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DRAWER_DATA, DrawerComponent, DrawerRef } from '../../../../shared/components/drawer';
import { FormErrorDisplayDirective } from '../../../../shared/directives/form-error-display/form-error-display.directive';
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
export class DefensesActionsDrawerComponent implements OnInit {
	readonly drawerRef = inject(DrawerRef);
	readonly drawerConfig = inject(DRAWER_DATA);
	readonly fb = inject(FormBuilder);

	form: FormGroup = new FormGroup({});

	ngOnInit(): void {
		this.form = this.fb.group({
			name: [null, Validators.required],
			url: [null, Validators.required]
		});
	}
}
