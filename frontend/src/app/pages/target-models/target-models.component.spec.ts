import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetModelsComponent } from './target-models.component';

describe('TargetModelsComponent', () => {
  let component: TargetModelsComponent;
  let fixture: ComponentFixture<TargetModelsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetModelsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TargetModelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
