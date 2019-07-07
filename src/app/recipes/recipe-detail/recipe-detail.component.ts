import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe:Recipe;
  id: number;

  constructor(private recipeService:RecipeService,
    private route: ActivatedRoute,
    private router: Router
  )  { }

  ngOnInit() {
    // this.route.paramMap.subscribe(
    //   (params:ParamMap)=>{
    //     this.id = +params.get('id');
    //     this.recipe = this.recipeService.getRecipe(this.id);
    //   }
    // )

    this.route.data.subscribe(
      (data: {recipe: Recipe}) => {
        this.recipe = data.recipe;
        if(this.recipe){
          this.id = +this.route.snapshot.paramMap.get('id');
        }else{
          this.router.navigate(['../'], {relativeTo: this.route});
        }
      }
    );
  }

  onAddToShoppingList(){
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
