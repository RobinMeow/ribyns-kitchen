import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CreateRecipeButton } from './create-recipe.button'

describe('CreateRecipeButtonComponent', () => {
  let component: CreateRecipeButton
  let fixture: ComponentFixture<CreateRecipeButton>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRecipeButton]
    }).compileComponents()

    fixture = TestBed.createComponent(CreateRecipeButton)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
