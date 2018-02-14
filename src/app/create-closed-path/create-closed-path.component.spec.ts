import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateClosedPathComponent } from './create-closed-path.component';

describe('CreateClosedPathComponent', () => {
  let component: CreateClosedPathComponent;
  let fixture: ComponentFixture<CreateClosedPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateClosedPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateClosedPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
