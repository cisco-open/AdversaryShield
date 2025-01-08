import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasesTableCardComponent } from './releases-table-card.component';

describe('ReleasesTableCardComponent', () => {
  let component: ReleasesTableCardComponent;
  let fixture: ComponentFixture<ReleasesTableCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReleasesTableCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleasesTableCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
