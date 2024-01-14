import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackSnackBarComponent } from './feedback-snack-bar.component';

describe('FeedbackSnackbarComponent', () => {
  let component: FeedbackSnackBarComponent;
  let fixture: ComponentFixture<FeedbackSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackSnackBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
