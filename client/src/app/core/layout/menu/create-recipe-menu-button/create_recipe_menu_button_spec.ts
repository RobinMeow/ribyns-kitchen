import { ComponentFixture, TestBed } from '@angular/core/testing'

import { CreateRecipeMenuButton } from './create_recipe_menu_button'
import { Router } from '@angular/router'
import { byTestAttr } from '@common/testing'

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
    const btn = byTestAttr<HTMLButtonElement>(
      fixture,
      'create-recipe-menu-button'
    )
    expect(btn).toBeTruthy()
    expect(btn.disabled).toBeFalse()
  })

  it('navigate route on click', () => {
    const router = TestBed.inject(Router)
    const navigateSpy = spyOn(router, 'navigate')
    const button = byTestAttr<HTMLButtonElement>(
      fixture,
      'create-recipe-menu-button'
    )
    button.click()
    expect(navigateSpy).toHaveBeenCalledOnceWith(['/create-recipe'])
  })
})
