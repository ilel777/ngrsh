import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from '../recipes/recipes.component';
import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from '../recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
import { RecipeDetailResolverService } from '../recipes/recipe-detail-resolver.service';
import { AuthGuard } from '../auth/auth-guard.service';

const recipesRoutes: Routes = [
  {
    path: 'recipes',
    component: RecipesComponent,
    data: {animation: 'recipes'} ,
    children: [
      {
        path: '',
        component: RecipeStartComponent
      },
      {
        path: 'new',
        component: RecipeEditComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: RecipeDetailComponent,
        resolve: {recipe: RecipeDetailResolverService },
        data: {animation: 'recipe-detail'}
      },
      {
        path: ':id/edit',
        component: RecipeEditComponent,
        canActivate: [AuthGuard],
        resolve: {recipe: RecipeDetailResolverService }
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(recipesRoutes)],
  exports: [RouterModule]
})

export class RecipesRoutingModule{}
