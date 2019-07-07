import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy{

  @ViewChild('shoppingEditForm', {static: false}) editForm:NgForm;
  private selectedIngSub:Subscription;
  private selectedIngIndex: number;
  private ingSelected  = false;
  private selectedIng:Ingredient;


  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit() {
    this.selectedIngSub = this.shoppingListService.selectedIngChanged.subscribe(
      (index: number) => {
        this.selectedIngIndex = index;
        if(index !== null){
          this.selectedIng = this.shoppingListService.getIngredient(index);
          if(this.selectedIng){
            this.editForm.setValue({
              'name': this.selectedIng.name,
              'amount': this.selectedIng.amount
            })
            this.ingSelected = true;
          }
        }else{
          this.ingSelected = false;
        }
      }
    )
  }
  ngOnDestroy(): void {
    this.selectedIngSub.unsubscribe();
  }

  // onAddClick(){
  //   let ingName = this.nameInputRef.nativeElement.value;
  //   let ingCount = this.amountInputRef.nativeElement.value;
  //   if(ingName && ingCount && ingCount > 0){
  //     this.shoppingListService.addIngredient(new Ingredient(ingName, ingCount));
  //   }else{
  //     console.log('invalid Input');
  //   }
  // }

  onSubmit(){
    let ingName = this.editForm.form.value.name;
    let ingCount = this.editForm.form.value.amount;
    if(this.ingSelected){
      this.shoppingListService.updateIngredient(this.selectedIngIndex, new Ingredient(ingName, ingCount)) ;
    }else{
      this.shoppingListService.addIngredient(new Ingredient(ingName, ingCount));
    }
    this.onClear();
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.selectedIngIndex);
    // this.shoppingListService.selectedIngChanged.next(Math.min(this.selectedIngIndex, this.shoppingListService.getIngredients().length-1));
    // this.editForm.reset();
    this.onClear();
  }

  onClear(){
    this.editForm.reset();
    this.shoppingListService.selectedIngChanged.next(null);
  }

  getSelectedIng(){
    return this.ingSelected;
  }
}
