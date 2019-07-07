import { Injectable, OnInit } from '@angular/core'
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService implements OnInit{
  // saveOpPanding = false;
  // fetchOpPanding = false;
  tokenChangedSub = new Subscription();
  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService){}


  storeRecipes(token: string){
    return this.http.put('https://recipesandsh.firebaseio.com/recipes.json?auth=' + token, this.recipeService.getRecipes() );
  }

  fetchRecipes(token: string): any {
    return this.http.get('https://recipesandsh.firebaseio.com/recipes.json?auth=' + token);
  }


  ngOnInit(): void {
    // this.tokenChangedSub = this.authService.tokenChanged.subscribe(
    //   (token) =>{
    //     if(this.saveOpPanding){
    //       this.storeRecipes(token).subscribe(
    //         response => {
    //           console.log(response);
    //           this.saveOpPanding = false;
    //         },
    //         error => console.log(error)
    //       );
    //     }
    //     if(this.fetchOpPanding){
    //       this.fetchRecipes(token).subscribe(
    //         (response)=>{
    //           console.log(response);
    //           <Recipe[]>(response).forEach(
    //             (recipe:Recipe) => {
    //               if(!recipe['ingredients']){
    //                 console.log(recipe);
    //                 recipe['ingredients'] = [];
    //               }
    //             }
    //           )
    //           this.recipeService.setRecipes(<Recipe[]>(response));
    //           this.fetchOpPanding = false;
    //         },
    //         (error) => {
    //           console.log(error);
    //         }
    //       );
    //     }
    //   }
    // )
  }
}
