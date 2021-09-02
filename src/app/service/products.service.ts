import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }

  obtenerProductos(){
    return this.http.get(environment.apiUrl + '/api/v1/products');
  }

  registrarProducto(form:any){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.post(environment.apiUrl + '/api/v1/products',form,{headers: headers});
  }

  buscarProducto(id:number){
    return this.http.get(environment.apiUrl + '/api/v1/products/' + id);
  }

  eliminarProducto(id:number){
    return this.http.delete(environment.apiUrl + '/api/v1/products/' + id);
  }

  editarProducto(form:any,id:number){
    let headers = new HttpHeaders().set('Content-Type','application/json');
    return this.http.put(environment.apiUrl + '/api/v1/products/' + id,form,{headers: headers});
  }

  
}
