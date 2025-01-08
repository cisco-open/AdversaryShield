import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleasesCreateCardComponent } from './releases-create-card.component';

describe('ReleasesCreateCardComponent', () => {
  let component: ReleasesCreateCardComponent;
  let fixture: ComponentFixture<ReleasesCreateCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReleasesCreateCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleasesCreateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
