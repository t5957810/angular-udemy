import { Ingredient } from "../../shared/model/ingredient";
import * as ShoppingListActions from "./shopping-list.actions";


export interface State {
    ingredients: Ingredient[],
    editedIngredient: Ingredient,
    editedIngredientIndex: number
}

const initState: State = {
    ingredients: [
        new Ingredient('a', 10),
        new Ingredient('b', 5)
    ],
    editedIngredient: null,
    editedIngredientIndex: -1
};

export function shoppingListReducer(state: State = initState, action: ShoppingListActions.ShoppingListActions) {
    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return { ...state, ingredients: [...state.ingredients, action.payload]};
        case ShoppingListActions.ADD_INGREDIENTS:
            return { ...state, ingredients: [...state.ingredients, ...action.payload]};
        case ShoppingListActions.UPDATE_INGREDIENT:
            // 找出原始陣列資料中的那個要修改的東西
            const ingredient = state.ingredients[state.editedIngredientIndex]; 
            
            // 用新的東西覆蓋此處的copy(例如可以保留原始資料的id，更新其他數值，所以用新的蓋掉copy的，而不是直接放一個新的物件)
            const updateIngredient = { ...ingredient, ...action.payload} 
            const updateIngredients = [...state.ingredients];
            updateIngredients[state.editedIngredientIndex] = updateIngredient;

            return { ...state, ingredients: updateIngredients, editedIngredient: null, editedIngredientIndex: -1};
        case ShoppingListActions.DELETE_INGREDIENT:
            // filter 會回傳new array，故不用copy
            return { ...state, ingredients: state.ingredients.filter((list, index) => {
                return index !== state.editedIngredientIndex;
            }), editedIngredient: null, editedIngredientIndex: -1};
        case ShoppingListActions.START_EDIT:    
            return { ...state, 
                editedIngredient: {...state.ingredients[action.payload]}, 
                editedIngredientIndex: action.payload
            };
        case ShoppingListActions.STOP_EDIT:    
            return { ...state, editedIngredient: null, editedIngredientIndex: -1};
        default:
            return state;
    }

    

}