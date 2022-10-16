/**
 * @file: shopping-list.service.ts
 * @author: Logan Bahr
 * @description: This file contains the shopping list service.
 * @since: 10/10/2022
 */
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  /**
   * Get the ingredients in the shopping list
   */
  getIngredients() {
    return this.ingredients.slice();
  }

  /**
   * Get an ingredient from the shopping list
   * @param index
   */
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  /**
   * Add an ingredient to the shopping list
   * @param ingredient
   */
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  /**
   * Add an array of ingredients to the shopping list
   * @param ingredients
   */
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  /**
   * Update an ingredient in the shopping list
   * @param index
   * @param newIngredient
   */
  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  /**
   * Delete an ingredient from the shopping list
   * @param index - the index of the ingredient to delete
   */
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
