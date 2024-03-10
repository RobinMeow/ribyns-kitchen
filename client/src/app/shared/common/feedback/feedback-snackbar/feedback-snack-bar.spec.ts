import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedbackSnackBar } from './feedback-snack-bar';
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA,
} from '@angular/material/snack-bar';
import { FeedbackData } from '../FeedbackData';

describe('FeedbackSnackbar', () => {
  let component: FeedbackSnackBar;
  let fixture: ComponentFixture<FeedbackSnackBar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackSnackBar],
      providers: [
        { provide: MatSnackBarRef, useValue: null! },
        {
          provide: MAT_SNACK_BAR_DATA,
          useValue: { message: 'test message' } as FeedbackData,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackSnackBar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
