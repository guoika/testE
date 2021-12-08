import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPackageComponent } from './review-package.component';

describe('ReviewPackageComponent', () => {
  let component: ReviewPackageComponent;
  let fixture: ComponentFixture<ReviewPackageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewPackageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
