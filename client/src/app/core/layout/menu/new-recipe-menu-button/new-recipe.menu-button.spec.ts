import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NewRecipeMenuButton } from './new-recipe.menu-button'
import { Router } from '@angular/router'
import { byTestAttr } from '@common/testing'

describe('NewRecipeMenuButton should', () => {
  let component: NewRecipeMenuButton
  let fixture: ComponentFixture<NewRecipeMenuButton>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewRecipeMenuButton]
    }).compileComponents()

    fixture = TestBed.createComponent(NewRecipeMenuButton)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('create', () => {
    expect(component).toBeTruthy()
  })

  it('be enabled', () => {
    const btn = byTestAttr<HTMLButtonElement>(fixture, 'new-recipe-menu-button')
    expect(btn).toBeTruthy()
    expect(btn.disabled).toBeFalse()
  })

  it('navigate route on click', () => {
    const router = TestBed.inject(Router)
    const navigateSpy = spyOn(router, 'navigate')
    const button = byTestAttr<HTMLButtonElement>(
      fixture,
      'new-recipe-menu-button'
    )
    button.click()
    expect(navigateSpy).toHaveBeenCalledOnceWith(['/new-recipe'])
  })
})
