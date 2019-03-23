import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitableSingleRowTableComponent } from './splitable-single-row-table.component';

describe('SplitableSingleRowTableComponent', () => {
  let component: SplitableSingleRowTableComponent;
  let fixture: ComponentFixture<SplitableSingleRowTableComponent>;

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
