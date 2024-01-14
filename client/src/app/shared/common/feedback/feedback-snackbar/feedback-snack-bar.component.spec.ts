import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackSnackBarComponent } from './feedback-snack-bar.component';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { FeedbackData } from '../FeedbackData';

describe('FeedbackSnackbarComponent', () => {
  let component: FeedbackSnackBarComponent;
  let fixture: ComponentFixture<FeedbackSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackSnackBarComponent],
      providers: [
        { provide: MatSnackBarRef, useValue: null! },
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: { message: 'test message' } as FeedbackData,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
