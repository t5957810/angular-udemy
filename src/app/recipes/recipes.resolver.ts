import { RecipeService } from './recipe.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Recipe } from './model/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolver implements Resolve<Recipe[]> {
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();
    
    if(recipes.length === 0 ){
      return this.dataStorageService.fetchRecipes();
    }
    return recipes;
  }
}
