import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecipe } from './view-recipe';

describe('Recipe should', () => {
  let component: ViewRecipe;
  let fixture: ComponentFixture<ViewRecipe>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewRecipe],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewRecipe);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create', () => {
    expect(component).toBeTruthy();
  });
});
