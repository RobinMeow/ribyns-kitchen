import { ComponentFixture, TestBed } from '@angular/core/testing'

import { RecipeView } from './recipe.view'
import { byTestAttr } from '@common/testing'
import { ActivatedRoute } from '@angular/router'
import { Recipe } from '../util/recipe'

describe('RecipeView should', () => {
  let component: RecipeView
  let fixture: ComponentFixture<RecipeView>
  const recipeMock: Recipe = {
    id: '123',
    name: 'recipetitle'
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeView],
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

    fixture = TestBed.createComponent(RecipeView)
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
