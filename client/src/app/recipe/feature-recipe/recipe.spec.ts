import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recipe } from './recipe';

describe('RecipeViewComponent should', () => {
  let component: Recipe;
  let fixture: ComponentFixture<Recipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recipe],
    }).compileComponents();

    fixture = TestBed.createComponent(Recipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });
});
