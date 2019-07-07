import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable }  from 'rxjs';
import { RecipeService } from './recipe.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeDetailResolverService implements Resolve<Recipe> {

  constructor(private recipeService: RecipeService,private router: Router ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Recipe> | Recipe{
    let id = route.paramMap.get('id');
    return this.recipeService.getRecipe(+id);
  }
}
