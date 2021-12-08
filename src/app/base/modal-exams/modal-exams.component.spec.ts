import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExamsComponent } from './modal-exams.component';

describe('ModalExamsComponent', () => {
  let component: ModalExamsComponent;
  let fixture: ComponentFixture<ModalExamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalExamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalExamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
