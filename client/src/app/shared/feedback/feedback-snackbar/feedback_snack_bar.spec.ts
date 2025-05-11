import { ComponentFixture, TestBed } from '@angular/core/testing'
import { FeedbackSnackBar } from './feedback_snack_bar'
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar'
import { MockProvider } from 'ng-mocks'
import { byTestAttr } from '@common/testing'

describe('FeedbackSnackbar should', () => {
  let component: FeedbackSnackBar
  let fixture: ComponentFixture<FeedbackSnackBar>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeedbackSnackBar],
      providers: [
        MockProvider(MAT_SNACK_BAR_DATA, {
          message: 'very unique test message'
        })
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(FeedbackSnackBar)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('create', () => {
    expect(component).toBeTruthy()
  })

  it('display the message', () => {
    const span = byTestAttr<HTMLSpanElement>(fixture, 'feedback-message')
    expect(span).toBeTruthy()
    expect(span.textContent).toBe('very unique test message')
  })
})
