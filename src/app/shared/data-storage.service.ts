import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService) {
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://angular-recipebook-d291b-default-rtdb.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  /**
   * Fetches recipes from the database.
   * Recipes will return an empty array of ingredients if no ingredients are added by user
   */
  fetchRecipes() {
    return this.http
      .get<Recipe[]>('https://angular-recipebook-d291b-default-rtdb.firebaseio.com/recipes.json')
      .pipe(
        map((recipe) => {
          return recipe
            .map(recipe => {
              return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
        }), tap(recipes => {
          this.recipeService.updateRecipes(recipes);
        }));
  }


}


