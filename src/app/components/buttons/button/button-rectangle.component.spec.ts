import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonRectangleComponent } from './button-rectangle.component';

describe('ButtonRectangleComponent', () => {
  let component: ButtonRectangleComponent;
  let fixture: ComponentFixture<ButtonRectangleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonRectangleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonRectangleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
