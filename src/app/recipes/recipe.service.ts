import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/model/ingredient';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './model/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged$ = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe('Test Recipe', 'description',
  //     'https://1.bp.blogspot.com/-jucMKDEALJs/YHw8gT0GHPI/AAAAAAAAnfY/64MpJTn5cW8ZR4H0QswgjJ4wPcEjPXimQCLcBGAsYHQ/s2300/%25E6%259C%25AA%25E5%2591%25BD%25E5%2590%258D-1%25E6%258B%25B7%25E8%25B2%259D.png', 
  //     [
  //       new Ingredient('Mike', 20),
  //       new Ingredient('Huo', 30)
  //     ]
  //     ),
  //   new Recipe('Test Recipe2', 'description2',
  //     'https://1.bp.blogspot.com/-uabcd3ShYrc/YVuxtDrzF5I/AAAAAAAAqlI/gB7v8vTYTkQUFcO-i8RoCiUgkAmBzkNqwCLcBGAsYHQ/s1000/%25E6%259C%25AA%25E5%2591%25BD%25E5%2590%258D-1.jpg', 
  //     [
  //       new Ingredient('Gho', 22)
  //     ]
  //     )
  // ];
  private recipes: Recipe[] = [];
  
  constructor(private shoppingListService: ShoppingListService) { }

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
    this.shoppingListService.addShoppingLists(ingredients);
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
