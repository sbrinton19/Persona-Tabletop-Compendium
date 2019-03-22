import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredTableComponent } from './filtered-table.component';

describe('FilteredTableComponent', () => {
  let component: FilteredTableComponent<any>;
  let fixture: ComponentFixture<FilteredTableComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilteredTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
