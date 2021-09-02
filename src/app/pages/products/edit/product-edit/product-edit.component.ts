import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/service/products.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  form  : FormGroup;
  imagen: string = '';
  archivos:any = [];
  file : any = null;
  color: string = 'transparent';

  constructor(private formB : FormBuilder, private http:ProductsService, private router:Router,private route:ActivatedRoute,private sanitizer:DomSanitizer) { 
    this.form = this.crearFormulario()
  }

  ngOnInit(): void {
    this.http.buscarProducto(this.route.snapshot.params.id).subscribe(
      (resp:any)=> {
        this.loadForm(resp.data);
        this.imagen = resp.data.imagen;
      }
    )
  }

  crearFormulario(){
    return this.formB.group(
      {
        nombre     : ['',[Validators.required,Validators.minLength(6)] ],
        descripcion: ['',[Validators.required,Validators.minLength(6)] ],
        imagen:['',[Validators.required]],
      }
    );
  }

  loadForm(data:Product){
    this.form.reset({
      nombre:data.nombre,
      descripcion:data.descripcion,
      imagen:data.imagen,
    });
  }

  validarCampo(campo:string):boolean{
    return (<boolean>this.form.get(campo)?.invalid) && (<boolean>this.form.get(campo)?.touched) 
  }

  extraerBase64 = async ($event:any) => new Promise((resolve,reject):any => {
    try {
      const unsafeImage = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImage);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error =>{
        resolve({
          base: null
        });
      };
    } catch (e) {
        return null;
    }
  })

  seletedFile(event:any){
    this.color = 'black';
    this.file = <File>event.target.files[0]; 
    this.archivos = [];
    this.archivos.push(this.file);
    this.extraerBase64( this.file).then( (img:any) => this.imagen = img.base )
  }

  save(){
    if(this.form.valid){

      Swal.fire({
        title: 'Estás seguro de editar este registro?',
        text: "No podrás revertir estos cambios!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, actualiza el registro!'
      }).then((result) => {
        if (result.isConfirmed) {
          const product = {
            nombre: this.form.get('nombre')?.value,
            descripcion: this.form.get('descripcion')?.value,
            imagen: (this.color==='transparent') ? this.imagen : this.imagen
          }
          this.http.editarProducto(product,this.route.snapshot.params.id).subscribe(
            resp => {
              Swal.fire(
                'Editado!',
                'El registro ha sido editado con éxito.',
                'success'
              );
              setTimeout(() => {
                this.router.navigate(['/products']);
              }, 1000);
          })
        }
      });


      /* const product = {
        nombre: this.form.get('nombre')?.value,
        descripcion: this.form.get('descripcion')?.value,
        imagen: (this.color==='transparent') ? this.imagen : this.imagen
      }
      this.http.editarProducto(product,this.route.snapshot.params.id).subscribe(
        resp => {
          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 1000); 
          */

          /* Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Producto modificado con éxito',
            showConfirmButton: false,
            timer: 1500
          })
          console.log(resp);
          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 1000); */ 
        //}  
      //)
    }else{
      this.form.markAllAsTouched()
    }  

  }

}
