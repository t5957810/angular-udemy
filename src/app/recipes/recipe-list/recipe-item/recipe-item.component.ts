import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../model/recipe';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input('recipeData') recipe :Recipe;
  @Input('recipeDataIndex') index :number;

  constructor() { }

  ngOnInit(): void {
  }


}
