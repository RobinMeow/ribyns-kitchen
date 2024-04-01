import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ViewRecipe } from './view_recipe'
import { byTestAttr } from '@common/testing'
import { ActivatedRoute } from '@angular/router'
import { Recipe } from '../util/recipe'

describe('Recipe should', () => {
  let component: ViewRecipe
  let fixture: ComponentFixture<ViewRecipe>
  const recipeMock: Recipe = {
    id: '123',
    title: 'recipetitle'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRecipe],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                recipe: recipeMock
              }
            }
          }
        }
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(ViewRecipe)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('create', () => {
    expect(component).toBeTruthy()
  })

  it('render title', () => {
    const element = byTestAttr<HTMLHeadElement>(fixture, 'title')
    expect(element).toBeTruthy()
    expect(element.textContent).toBe('recipetitle')
  })
})
