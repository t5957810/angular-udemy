import { RecipeService } from './../recipe.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.scss']
})
export class RecipeEditComponent implements OnInit {
  id: number
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, 
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit(): void {
      this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
        this.editMode = (params['id']) ? true : false;
        this.initForm();
      })
  }

  onSave() {
    if(this.editMode) {
        this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
        this.recipeService.addRecipe(this.recipeForm.value);
    }
    
    this.onCancel();
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onClearAllIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).clear();
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route});
  }

  private initForm() {
      let recipeName = '';
      let recipeImagePath = '';
      let recipeDescription = '';
      let recipeIngredients = new FormArray([]);

      if(this.editMode) {
        const recipe = this.recipeService.getRecipe(this.id);
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;

        if(recipe.ingredients.length > 0) {
          for(let recipeItem of recipe.ingredients) {
            recipeIngredients.push(new FormGroup({
              'name': new FormControl(recipeItem.name, [Validators.required]),
              'amount': new FormControl(recipeItem.amount, [Validators.required, Validators.pattern('^[0-9]{0,8}$')])
            }));
          }
        }
      }

      this.recipeForm = new FormGroup({
        'name': new FormControl(recipeName, [Validators.required]),
        'imagePath': new FormControl(recipeImagePath, [Validators.required]),
        'description': new FormControl(recipeDescription),
        'ingredients': recipeIngredients
      });
  }



  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
        'name': new FormControl(null, [Validators.required]),
        'amount': new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{0,8}$')])
      }));
  }

  get ingredientsControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls
  }

}
