import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = [];
  recipesSubscription$: Subscription;

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
    this.recipesSubscription$ = this.recipeService.recipesChanged$.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    })
  }

  ngOnDestroy() {
    this.recipesSubscription$.unsubscribe();
  }

  onNew() {
    this.router.navigate(['new'], { relativeTo: this.route});
  }
}
