import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './pages/products/products.component';
import { HomeComponent } from './pages/home/home.component';
import { CreateComponent } from './pages/users/create/create.component';
import { EditComponent } from './pages/users/edit/edit.component';
import { UsersComponent } from './pages/users/users.component';
import { ProductCreateComponent } from './pages/products/edit/product-create/product-create.component';
import { ProductEditComponent } from './pages/products/edit/product-edit/product-edit.component';
import { ApiComponent } from './pages/api/api.component';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'users',
    component:UsersComponent
  },
  {
    path:'api',
    component:ApiComponent
  },
  {
    path:'users/create',
    component:CreateComponent
  },
  {
    path:'users/edit/:id',
    component:EditComponent
  },
  {
    path:'products',
    component:ProductsComponent
  },
  {
    path:'products/create',
    component:ProductCreateComponent
  },
  {
    path:'products/edit/:id',
    component:ProductEditComponent
  },
  {
    path:'**',
    pathMatch:'full',
    redirectTo:'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
