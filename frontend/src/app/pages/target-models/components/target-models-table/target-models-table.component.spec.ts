import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetModelsTableComponent } from './target-models-table.component';

describe('TargetModelsTableComponent', () => {
  let component: TargetModelsTableComponent;
  let fixture: ComponentFixture<TargetModelsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetModelsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TargetModelsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
