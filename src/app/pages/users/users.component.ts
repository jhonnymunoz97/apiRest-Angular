import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UsersService } from 'src/app/service/users.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  urlIA = 'https://i.pravatar.cc/1000';
  users: User[];

  constructor(private userService:UsersService) { 
    this.users = [];
  }

  ngOnInit(): void {
    this.userService.obtenerUsuarios().subscribe(
      (resp:any) => this.users = resp.data 
    )
  }

  delete(id:number){
    Swal.fire({
      title: 'Estás seguro de eliminar este registro?',
      text: "No podrás revertir estos cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, elimina el registro!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'El registro ha sido eliminado.',
          'success'
        )
        this.userService.eliminarUsuario(id).subscribe(
          (resp:any) => {
            this.userService.obtenerUsuarios().subscribe(
              (resp:any) => this.users = resp.data
            )
          }
        )
      }
    })
    
  }

}
