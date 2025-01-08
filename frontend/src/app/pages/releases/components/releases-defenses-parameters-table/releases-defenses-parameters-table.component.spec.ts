import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasesDefensesParametersTableComponent } from './releases-defenses-parameters-table.component';

describe('ReleasesDefensesParametersTableComponent', () => {
  let component: ReleasesDefensesParametersTableComponent;
  let fixture: ComponentFixture<ReleasesDefensesParametersTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReleasesDefensesParametersTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleasesDefensesParametersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
