import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadFromDialogComponent } from './load-from-dialog.component';

describe('LoadFromDialogComponent', () => {
  let component: LoadFromDialogComponent;
  let fixture: ComponentFixture<LoadFromDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadFromDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadFromDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
