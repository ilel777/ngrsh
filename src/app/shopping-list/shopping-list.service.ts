import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private _ingredients: Ingredient[] = [
    new Ingredient('Tomato', 10),
    new Ingredient('Potato', 5)
  ];

  ingredientsChanged = new Subject<Ingredient[]>();
  selectedIngChanged = new Subject<number>();

  constructor() { }

  public getIngredient(index:number){
    return this._ingredients[index];
  }
  public setIngredients(value: Ingredient[]) {
    this._ingredients = value;
  }
  public getIngredients(): Ingredient[] {
    return this._ingredients.slice();
  }
  public addIngredient(ingredient:Ingredient){
    this._ingredients.push(ingredient);
    this.ingredientsChanged.next(this.getIngredients());
  }
  public addIngredients(ingredients: Ingredient[]): any {
    this._ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.getIngredients());
  }
  public deleteIngredient(index){
    this._ingredients.splice(index,1);
    this.ingredientsChanged.next(this.getIngredients());
  }
  public updateIngredient( index: number, ingredient: Ingredient){
    this._ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.getIngredients());
  }
}
