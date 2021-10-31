import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/model/ingredient';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  ingredientChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('a', 10),
    new Ingredient('b', 5)
  ];

  addShoppingList(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientChanged.next(this.getIngredients());
  }

  addShoppingLists(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientChanged.next(this.getIngredients());
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientChanged.next(this.getIngredients());
  }

  removeIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientChanged.next(this.getIngredients());
  }



  constructor() { }
}
