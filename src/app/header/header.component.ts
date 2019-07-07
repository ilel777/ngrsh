import { Component } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from '../recipes/recipe.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent{

  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService, private authService: AuthService){}

  onSaveToServer(){
    // this.dataStorageService.saveOpPanding = true;

    this.dataStorageService.storeRecipes(this.authService.getToken()).subscribe(
      (response) => {
        console.log(response);
        // this.dataStorageService.saveOpPanding = false
      },
      (error) => {console.log(error)}
    );
  }

  onFetchData(){
    // this.dataStorageService.fetchOpPanding = true;

    this.dataStorageService.fetchRecipes(this.authService.getToken()).subscribe(
      (response)=>{
        console.log(response);
        <Recipe[]>(response).forEach(
          (recipe:Recipe) => {
            if(!recipe['ingredients']){
              console.log(recipe);
              recipe['ingredients'] = [];
            }
          }
        )
        this.recipeService.setRecipes(<Recipe[]>(response));
        // this.dataStorageService.fetchOpPanding = false;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onLogout(){
    this.authService.logout();
  }

  getAuthService(){
    return this.authService;
  }
}
