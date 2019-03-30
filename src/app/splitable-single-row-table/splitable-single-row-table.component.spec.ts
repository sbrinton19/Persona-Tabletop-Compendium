import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitableSingleRowTableComponent } from './splitable-single-row-table.component';

describe('SplitableSingleRowTableComponent', () => {
  let component: SplitableSingleRowTableComponent<any>;
  let fixture: ComponentFixture<SplitableSingleRowTableComponent<any>>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitableSingleRowTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitableSingleRowTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
