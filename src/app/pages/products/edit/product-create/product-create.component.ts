import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/service/products.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss']
})
export class ProductCreateComponent implements OnInit {

  form: FormGroup;

  //  https://i.pravatar.cc/1000
  imagen:string = '';
  archivos:any = [];
  file : any = null;
  

  constructor(private formB : FormBuilder, private http:ProductsService, private router:Router,private httpC:HttpClient, private sanitizer:DomSanitizer) { 
    this.form = this.crearFormulario()
  }

  ngOnInit(): void {
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

  loadForm(){
    this.form.reset({
      nombre:'',
      descripcion:'',
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
    this.file = <File>event.target.files[0]; 
    this.archivos = [];
    this.archivos.push(this.file);
    this.extraerBase64( this.file).then( (img:any) => this.imagen = img.base )
  }

  save(){
    if(this.form.valid){
      const product = {
        nombre: this.form.get('nombre')?.value,
        descripcion: this.form.get('descripcion')?.value,
        imagen: this.imagen
      }
      this.http.registrarProducto(product).subscribe(
        resp => {
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'Producto registrado con éxito',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
            this.router.navigate(['/products']);
          }, 1000);
        }  
      )
    }else{
      this.form.markAllAsTouched()
    }  
  }

}
