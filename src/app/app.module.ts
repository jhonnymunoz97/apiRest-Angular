import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';

import { HttpClientModule } from '@angular/common/http';
import { CreateComponent } from './pages/users/create/create.component';
import { EditComponent } from './pages/users/edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductsComponent } from './pages/products/products.component';
import { RouterModule } from '@angular/router';
import { ProductEditComponent } from './pages/products/edit/product-edit/product-edit.component';
import { ProductCreateComponent } from './pages/products/edit/product-create/product-create.component';
import { ApiComponent } from './pages/api/api.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    SidebarComponent,
    CreateComponent,
    EditComponent,
    ProductsComponent,
    ProductEditComponent,
    ProductCreateComponent,
    ApiComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
