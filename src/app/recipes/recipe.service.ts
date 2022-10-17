import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';

import {Recipe} from './recipe.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService) {
  }

  private recipes: Recipe[] = [];

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Burger',
  //     'A nice cheeseburger.',
  //     'https://iambaker.net/wp-content/uploads/2019/05/cheeseburger-1.jpg',
  //     [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
  //   ),
  //   new Recipe(
  //     'Hotdog',
  //     'A nice hotdog.',
  //     'https://upload.wikimedia.org/wikipedia/commons/f/fb/Hotdog_-_Evan_Swigart.jpg',
  //     [
  //       new Ingredient('Bun', 1),
  //       new Ingredient('Ketchup', 1),
  //       new Ingredient('Mustard', 1),
  //       new Ingredient('Sausage', 1),
  //     ]
  //   ),
  // ];

  getRecipes() {
    // slice() returns a copy of the array, not the array itself (which is a reference type)
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }


}
