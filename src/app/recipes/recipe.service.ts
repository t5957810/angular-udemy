import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/model/ingredient';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';
import { Recipe } from './model/recipe';


@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged$ = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];
  
  constructor(
    // private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
  ) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged$.next(this.getRecipes());
  }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(iddex: number): Recipe {
    return this.recipes[iddex];
  }
  
  addIngredientToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingListService.addShoppingLists(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged$.next(this.getRecipes());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged$.next(this.getRecipes());
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged$.next(this.getRecipes());
  }

}
