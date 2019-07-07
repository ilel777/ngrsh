import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model'
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})

export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  selectedIngIndex: number;

  private ingredientsChangedSub: Subscription;
  private selectedIngSub:Subscription;

  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.ingredientsChangedSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[]) => {
        this.ingredients = ingredients;
      }
    )
    this.selectedIngSub = this.shoppingListService.selectedIngChanged.subscribe(
      (index: number) => {
        this.selectedIngIndex = index;
      }
    )
  }

  ngOnDestroy(): void {
    this.ingredientsChangedSub.unsubscribe();
    this.selectedIngSub.unsubscribe();
  }

  onItemClick(index){
    this.selectedIngIndex = index;
    this.shoppingListService.selectedIngChanged.next(index);
  }
}
