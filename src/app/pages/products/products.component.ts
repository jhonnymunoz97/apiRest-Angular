import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/service/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];
  
  constructor(private http:ProductsService) { 
    this.products = [];
  }

  ngOnInit(): void {
    this.http.obtenerProductos().subscribe(
      (resp:any) => this.products = resp.data
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
        this.http.eliminarProducto(id).subscribe(
          (resp:any) => {
            console.log(resp);
            this.http.obtenerProductos().subscribe(
              (resp:any) => this.products = resp.data
            )
          }
        )
      }
    })
  }

}
