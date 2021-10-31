import { AuthService } from './../auth/auth.service';
import { RecipeService } from './../recipes/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/model/recipe';
import { exhaustMap, map, take, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private contentPath = 'https://angular-udemy-5b4ee-default-rtdb.firebaseio.com';

  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) { }

  storeRecipes() {
    const recipes: Recipe[] = this.recipeService.getRecipes();
    return this.http.put(this.contentPath + '/recipes.json', recipes).subscribe();
  }

  fetchRecipes() {
    return this.authService.user$.pipe(
      take(1), 
      exhaustMap(user => {
        return this.http.get<Recipe[]>(this.contentPath + '/recipes.json') // 原本另一個Observable 
      }),
      map((recipes: Recipe[]) => {
        return recipes.map(recipe => {
          return { ...recipe, ingredients: (recipe.ingredients) ? recipe.ingredients : [] };
        })
      }),
      tap((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }

}
