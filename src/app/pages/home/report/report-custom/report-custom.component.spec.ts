import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCustomComponent } from './report-custom.component';

describe('ReportCustomComponent', () => {
  let component: ReportCustomComponent;
  let fixture: ComponentFixture<ReportCustomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCustomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
