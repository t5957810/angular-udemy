import { Subscription } from 'rxjs';
import { Component, ElementRef, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/model/ingredient';
import { ShoppingListService } from '../shopping-list.service';

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
  editItemIndex: number;
  name: string;
  amount: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.subscription$ = this.shoppingListService.startedEditing.subscribe((index: number) => {
      this.editMode = true;
      this.editItemIndex = index;
      this.editIngredient = this.shoppingListService.getIngredient(index);
      this.shoppingForm.setValue({
        name: this.editIngredient.name,
        amount: this.editIngredient.amount
      });
    });
  }

  addShoppingList() {
    const name = this.shoppingForm.value.name;
    const amount = this.shoppingForm.value.amount;
    const ingredient = new Ingredient(name, amount);

    if(this.editMode) {
      this.shoppingListService.updateIngredient(this.editItemIndex, ingredient);
      this.onClear();
      return;
    }

    this.editMode = false;
    this.shoppingListService.addShoppingList(ingredient);
  }

  onClear() {
    this.editMode = false;
    this.shoppingForm.reset();
  }

  onDelete() {
    this.shoppingListService.removeIngredient(this.editItemIndex);
    this.onClear();
  }

  ngOnDestroy() {
    this.subscription$.unsubscribe();
  }

}
