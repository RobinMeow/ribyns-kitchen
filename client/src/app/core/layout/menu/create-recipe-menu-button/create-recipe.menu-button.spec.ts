import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CreateRecipeMenuButton } from './create-recipe.menu-button'
import { Router } from '@angular/router'
import { queryByTestAttr } from '@testing'

describe('CreateRecipeMenuButton should', () => {
  let component: CreateRecipeMenuButton
  let fixture: ComponentFixture<CreateRecipeMenuButton>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRecipeMenuButton]
    }).compileComponents()

    fixture = TestBed.createComponent(CreateRecipeMenuButton)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('create', () => {
    expect(component).toBeTruthy()
  })

  it('be enabled', () => {
    const element = queryByTestAttr<HTMLElement>(
      fixture,
      'create-recipe-menu-button'
    )
    expect(element).toBeTruthy()
    expect(element.querySelector('[disabled]')).toBeNull()
  })

  it('navigate route on click', () => {
    const router = TestBed.inject(Router)
    const navigateSpy = spyOn(router, 'navigate')
    const button = queryByTestAttr<HTMLButtonElement>(
      fixture,
      'create-recipe-menu-button'
    )
    button.click()
    expect(navigateSpy).toHaveBeenCalledOnceWith(['/create-recipe'])
  })
})
