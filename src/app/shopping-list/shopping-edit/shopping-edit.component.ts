import { Subscription } from 'rxjs';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/model/ingredient';
// import { ShoppingListService } from '../shopping-list.service';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducer';
import * as fromApp from 'src/app/store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') shoppingForm: NgForm;
  editIngredient: Ingredient;
  subscription$: Subscription;
  editMode = false;
  // editItemIndex: number;
  name: string;
  amount: number;

  constructor(
    // private shoppingListService: ShoppingListService, 
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.subscription$ = this.store.select('shoppingList').subscribe( stateData => {
      if(stateData.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editIngredient = stateData.editedIngredient;
        // this.editItemIndex =  stateData.editedIngredientIndex;
        this.shoppingForm.setValue({
          name: this.editIngredient.name,
          amount: this.editIngredient.amount
        });
      } else {
        this.editMode = false;
      }
    });

    // this.subscription$ = this.shoppingListService.startedEditing.subscribe((index: number) => {
    //   this.editMode = true;
    //   this.editItemIndex = index;
    //   this.editIngredient = this.shoppingListService.getIngredient(index);
    //   this.shoppingForm.setValue({
    //     name: this.editIngredient.name,
    //     amount: this.editIngredient.amount
    //   });
    // });
  }

  addShoppingList() {
    const name = this.shoppingForm.value.name;
    const amount = this.shoppingForm.value.amount;
    const ingredient = new Ingredient(name, amount);

    if(this.editMode) {
      // this.shoppingListService.updateIngredient(this.editItemIndex, ingredient);
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(ingredient));
      this.onClear();
      return;
    }

    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.AddIngredient(ingredient));
    // this.shoppingListService.addShoppingList(ingredient);
  }

  onClear() {
    this.editMode = false;
    this.shoppingForm.reset();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

  onDelete() {
    // this.shoppingListService.removeIngredient(this.editItemIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }

}
