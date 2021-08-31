import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  
  form: FormGroup;

  constructor(private route:ActivatedRoute, private http:UsersService, private formB : FormBuilder, private router:Router) {
    this.form = this.crearFormulario();
   }

  ngOnInit(): void {  
    this.http.buscarUsuario(this.route.snapshot.params.id).subscribe(
      (resp:any) => this.loadForm(resp.data))
  }

  crearFormulario(){
    return this.formB.group(
      {
        name     : ['',Validators.required],
        email    : ['',[Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$'),Validators.required]],
        password:['',[Validators.required,Validators.minLength(6)] ],
        passwordConfirm:['',[Validators.required] ]
      },{
        validators: this.passwordIguales('password','passwordConfirm')
      }
    );
  }

  loadForm(data:any){
    this.form.reset({
      name: data.name,
      email: data.email,
      password:'',
      passwordConfirm:'',
    });
  }

  passwordIguales(pass1:string,pass2:string){
    return( formGroup: FormGroup )=>{
      const pass1Control = formGroup.controls[pass1];
      const pass2Control = formGroup.controls[pass2];
      if(pass1Control.value === pass2Control.value){
        pass2Control.setErrors(null)
      }else{
        pass2Control.setErrors({noEsIgual:true})
      }
    }
  }

  validarCampo(campo:string):boolean{
    return (<boolean>this.form.get(campo)?.invalid) && (<boolean>this.form.get(campo)?.touched) 
  }

  confirmPassword():boolean{
    return (this.form.get('password')?.value === this.form.get('passwordConfirm')?.value) ? false : true
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
          Swal.fire(
            'Editado!',
            'El registro ha sido editado con éxito.',
            'success'
          )
          let form:any = {};
          form = Object.assign({id:this.route.snapshot.params.id},this.form.value)
          delete form.passwordConfirm;  
          this.http.editarUsuario(form,this.route.snapshot.params.id).subscribe(
            resp => {}
          );
          setTimeout(() => {
            this.router.navigate(['/users']);
          }, 1000);
        }
      })
      
      
      
    }else{
      this.form.markAllAsTouched()
    }
  }


}
