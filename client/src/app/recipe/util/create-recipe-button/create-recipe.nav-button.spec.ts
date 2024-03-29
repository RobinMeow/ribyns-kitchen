import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CreateRecipeNavButton } from './create-recipe.nav-button'
import { Router } from '@angular/router'
import { queryByTestAttr } from '@testing'

describe('CreateRecipeButton should', () => {
  let component: CreateRecipeNavButton
  let fixture: ComponentFixture<CreateRecipeNavButton>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRecipeNavButton]
    }).compileComponents()

    fixture = TestBed.createComponent(CreateRecipeNavButton)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('create', () => {
    expect(component).toBeTruthy()
  })

  it('navigate route on click', () => {
    const router = TestBed.inject(Router)
    const navigateSpy = spyOn(router, 'navigate')
    const button = queryByTestAttr<HTMLButtonElement>(
      fixture,
      'create-recipe-nav-button'
    )
    button.click()
    expect(navigateSpy).toHaveBeenCalledOnceWith(['/create-recipe'])
  })
})
