import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CreateComponent } from './pages/users/create/create.component';
import { EditComponent } from './pages/users/edit/edit.component';
import { UsersComponent } from './pages/users/users.component';

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
    path:'users/create',
    component:CreateComponent
  },
  {
    path:'users/edit/:id',
    component:EditComponent
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
