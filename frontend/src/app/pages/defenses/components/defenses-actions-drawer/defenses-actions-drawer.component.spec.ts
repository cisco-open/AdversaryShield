import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefensesActionsDrawerComponent } from './defenses-actions-drawer.component';

describe('DefensesActionsDrawerComponent', () => {
  let component: DefensesActionsDrawerComponent;
  let fixture: ComponentFixture<DefensesActionsDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefensesActionsDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefensesActionsDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
