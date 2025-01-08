import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasesDefensesTableComponent } from './releases-defenses-table.component';

describe('ReleasesDefensesTableComponent', () => {
  let component: ReleasesDefensesTableComponent;
  let fixture: ComponentFixture<ReleasesDefensesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReleasesDefensesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleasesDefensesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
