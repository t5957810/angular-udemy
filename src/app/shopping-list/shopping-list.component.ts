import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/model/ingredient';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  iChangeSub$: Subscription;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
      this.ingredients = this.shoppingListService.getIngredients();
      this.iChangeSub$ = this.shoppingListService.ingredientChanged.subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      })
  }

  onEditItem(index: number) {
      this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    this.iChangeSub$.unsubscribe();
  }

}
