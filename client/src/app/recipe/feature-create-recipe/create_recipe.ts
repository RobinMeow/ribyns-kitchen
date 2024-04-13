import { ChangeDetectionStrategy, Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { ActivatedRoute, Router } from '@angular/router'
import { RecipeApi } from '../util/recipe_api'
import { NewRecipe } from '../util/new_recipe'
import { Recipe } from '../util/recipe'
import {
  Validation,
  ValidationField,
  ValidatorsFactory,
  validationName
} from '@common/constraints'
import { assert } from '@common/assertions'

class ConstraintReader {
  private readonly validationField: ValidationField

  constructor(validationField: ValidationField) {
    this.validationField = validationField
  }

  readValue<T>(validation: Validation): T {
    const constraint = this.validationField.constraints.find(
      (x) => x.validation === validation
    )
    assert(constraint, `Validation '${validationName(validation)}' not found.`)
    return <T>constraint.value
  }
}

class ValidationFields {
  private readonly validationFields: ValidationField[]

  constructor(validationFields: ValidationField[]) {
    this.validationFields = validationFields
  }

  get(name: string): ValidationField {
    const validationField = this.validationFields.find((x) => x.name === name)
    assert(validationField, `ValidationField '${name}' not found.`)
    return validationField
  }

  toArray(): ValidationField[] {
    return structuredClone(this.validationFields)
  }
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './create_recipe.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateRecipe {
  private readonly nnfb = inject(NonNullableFormBuilder)
  private readonly recipeApi = inject(RecipeApi)
  private readonly router = inject(Router)
  private readonly activatedRouteSnapshot = inject(ActivatedRoute).snapshot
  private readonly validationFields: ValidationFields = new ValidationFields(
    this.activatedRouteSnapshot.data['validationFields']
  )

  private readonly titleConstraintReader = new ConstraintReader(
    this.validationFields.get('title')
  )

  protected readonly titleMinLength = this.titleConstraintReader.readValue(
    Validation.Min
  )
  protected readonly titleMaxLength = this.titleConstraintReader.readValue(
    Validation.Max
  )

  protected readonly form = this.nnfb.group({
    title: [
      '',
      ValidatorsFactory.create('title', this.validationFields.toArray())
    ]
  })

  protected async onSubmit(): Promise<void> {
    console.log(this.form)
    if (this.form.invalid) return

    const newRecipe: NewRecipe = {
      title: this.form.controls.title.value
    }

    const recipe: Recipe = await this.recipeApi.newAsync(newRecipe)
    void this.router.navigate(['/recipe', recipe.id])
  }
}
