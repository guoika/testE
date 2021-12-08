import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMethodComponent } from './change-method.component';

describe('ChangeMethodComponent', () => {
  let component: ChangeMethodComponent;
  let fixture: ComponentFixture<ChangeMethodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeMethodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
