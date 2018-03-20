import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaeComponent } from './personae.component';

describe('PersonaeComponent', () => {
  let component: PersonaeComponent;
  let fixture: ComponentFixture<PersonaeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonaeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
