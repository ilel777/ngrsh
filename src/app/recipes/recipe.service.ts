import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Test Recipe One', 'description for test Recipe One', 'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
  [
    new Ingredient('Potato', 10),
    new Ingredient('Carrot', 4)
  ]),
    new Recipe('Test Recipe Two', 'description for test recipe Two', 'https://cdn.pixabay.com/photo/2017/09/17/23/21/gastronomy-2760200_960_720.jpg',
  [
    new Ingredient('Meat', 1),
    new Ingredient('Chease', 3)
  ])
  ];
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService:ShoppingListService, private http: HttpClient) { }


  getRecipes(): Recipe[] {
    return this.recipes;
  }

  getRecipe(index:number){
      return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients:Ingredient[]){
    this.shoppingListService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe): any {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, recipe: Recipe): any {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number): any {
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice());
  }
  setRecipes(fetchedRecipes: Recipe[]): any {
    this.recipes = fetchedRecipes;
    this.recipesChanged.next(this.recipes.slice());
  }
}
