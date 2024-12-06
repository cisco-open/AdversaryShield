import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetModelActionsDrawerComponent } from './target-model-actions-drawer.component';

describe('TargetModelActionsDrawerComponent', () => {
  let component: TargetModelActionsDrawerComponent;
  let fixture: ComponentFixture<TargetModelActionsDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetModelActionsDrawerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TargetModelActionsDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
