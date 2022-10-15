import { ShoppingListService } from "./../shopping-list/shopping-list.service";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

import { Recipe } from "./recipe.model";

@Injectable({
  providedIn: "root",
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe(
      "Burger",
      "A nice cheeseburger.",
      "https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg",
      [new Ingredient("Buns", 2), new Ingredient("Meat", 1)]
    ),
    new Recipe(
      "Hotdog",
      "A nice hotdog.",
      "https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg",
      [
        new Ingredient("Bun", 1),
        new Ingredient("Ketchup", 1),
        new Ingredient("Mustard", 1),
        new Ingredient("Sausage", 1),
      ]
    ),
  ];

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

  constructor(private shoppingListService: ShoppingListService) {}
}
