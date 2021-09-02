import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  obtenerUsuarios(){
    return this.http.get(environment.apiUrl + '/api/v1/users');
  }

  registrarUsuario(form:User){
    return this.http.post(environment.apiUrl + '/api/v1/users', form);
  }

  buscarUsuario(id:number){
    return this.http.get(environment.apiUrl + '/api/v1/users/' + id)
  }

  editarUsuario(form:User,id:number){
    return this.http.put(environment.apiUrl + '/api/v1/users/' + id,form);
  }

  eliminarUsuario(id:number){
    return this.http.delete(environment.apiUrl + '/api/v1/users/' + id);
  }
}
