import * as fromApp from './../store/app.reducer';
import * as ShoppingListActions from './store/shopping-list.actions';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { Ingredient } from '../shared/model/ingredient';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.scss']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients: Ingredient[] = [];
  ingredients: Observable<{ ingredients: Ingredient[]}>;
  iChangeSub$: Subscription;

  constructor(
    // private shoppingListService: ShoppingListService,
    private store: Store<fromApp.AppState>
    ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
      // this.ingredients = this.shoppingListService.getIngredients();
      // this.iChangeSub$ = this.shoppingListService.ingredientChanged.subscribe((ingredients: Ingredient[]) => {
      //   this.ingredients = ingredients;
      // })
  }

  onEditItem(index: number) {
      this.store.dispatch(new ShoppingListActions.StartEdit(index));
      //this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy() {
    // this.iChangeSub$.unsubscribe();
  }
}
