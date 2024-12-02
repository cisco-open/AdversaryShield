import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNoRecordsComponent } from './table-no-records.component';

describe('TableNoRecordsComponent', () => {
  let component: TableNoRecordsComponent;
  let fixture: ComponentFixture<TableNoRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableNoRecordsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableNoRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
