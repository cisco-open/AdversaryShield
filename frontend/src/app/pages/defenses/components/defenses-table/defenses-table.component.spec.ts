import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefensesTableComponent } from './defenses-table.component';

describe('DefensesTableComponent', () => {
  let component: DefensesTableComponent;
  let fixture: ComponentFixture<DefensesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DefensesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DefensesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
