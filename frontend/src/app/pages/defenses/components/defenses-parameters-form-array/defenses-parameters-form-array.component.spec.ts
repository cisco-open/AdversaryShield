import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefensesParametersFormArrayComponent } from './defenses-parameters-form-array.component';

describe('DefensesParametersFormArrayComponent', () => {
  let component: DefensesParametersFormArrayComponent;
  let fixture: ComponentFixture<DefensesParametersFormArrayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefensesParametersFormArrayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefensesParametersFormArrayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
