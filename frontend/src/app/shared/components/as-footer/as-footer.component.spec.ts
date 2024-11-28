import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsFooterComponent } from './as-footer.component';

describe('AsFooterComponent', () => {
	let component: AsFooterComponent;
	let fixture: ComponentFixture<AsFooterComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [AsFooterComponent]
		});
		fixture = TestBed.createComponent(AsFooterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
