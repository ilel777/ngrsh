import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
    id: number;
    editMode = false;
    recipeForm: FormGroup;
    recipe: Recipe;

  constructor(private router: Router, private route: ActivatedRoute,private recipeService: RecipeService) { }

  ngOnInit() {
    // this.route.paramMap.subscribe(
    //   (params: ParamMap) =>{
    //     // console.log(params);
    //     // console.log(params.get('id'));
    //     if(params.has('id')){
    //       this.id = +params.get('id');
    //       this.editMode = this.id != null;
    //     }
    //     // console.log(this.id);
    //     this.initForm();
    //   }
    // )
    this.route.data.subscribe(
      (data: Data) => {
        if(data['recipe']){
          this.editMode = true;
          this.recipe = data['recipe'];
          this.id = +this.route.snapshot.paramMap.get('id');
        }else{
          this.editMode = false;
          this.router.navigate(['recipes/new']);
        }
      }
    )

    this.initForm();
  }

  initForm(){
    console.log(this.id);
    console.log(this.editMode);
    let recipeName = '';
    let recipeImgUrl = '';
    let recipeDesc = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      // let recipe = this.recipeService.getRecipe(this.id);
      let recipe = this.recipe;
      recipeName = recipe.name;
      recipeImgUrl = recipe.imagePath;
      recipeDesc = recipe.description;
      if(recipe['ingredients']){
        recipe.ingredients.forEach(
          (ingredient) => {
            recipeIngredients.push(new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            }))
          }
        )
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImgUrl, Validators.required),
      'description': new FormControl(recipeDesc, Validators.required),
      'ingredients': recipeIngredients
    })
  }

  onAddIngredient(){
    let ingredientsCtrlArr = (<FormArray>this.recipeForm.get('ingredients'));
    ingredientsCtrlArr.push(new FormGroup({
      'name': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }))
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit(){
    // console.log(this.recipeForm);
    //   let recipeName = this.recipeForm.get('name').value;
    //   let recipeImgPath = this.recipeForm.get('imagePath').value;
    //   let recipeDesc = this.recipeForm.get('description').value;
    //   let recipeIngs = [];
    //   (<FormArray>this.recipeForm.get('ingredients')).controls.forEach(
    //     (ingFormGroup: FormGroup) => {
    //       recipeIngs.push(new Ingredient(ingFormGroup.get('name').value, ingFormGroup.get('amount').value));
    //     }
    //   )
    //   let recipe = new Recipe(recipeName, recipeDesc, recipeImgPath, recipeIngs);
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
      console.log(this.recipeForm.value);
    }else{
      this.recipeService.addRecipe(this.recipeForm.value);
      console.log(this.recipeForm.value);
    }

    this.onCancel();
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
