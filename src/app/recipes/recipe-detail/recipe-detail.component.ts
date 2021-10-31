import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../model/recipe';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipeDetail: Recipe;
  id: number;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
        this.id = +param['id'];
        this.recipeDetail = this.recipeService.getRecipe(this.id);
    });
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route});
  }

  onDelete() {
    this.recipeService.removeRecipe(this.id);
    this.router.navigate(['/recipes']);
  }

  addToShoppingList() {
    this.recipeService.addIngredientToShoppingList(this.recipeDetail.ingredients);
  }

}
