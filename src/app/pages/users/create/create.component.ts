import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/service/users.service';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
  form: FormGroup;

  constructor(private formB : FormBuilder, private http:UsersService, private router:Router) { 
    this.form = this.crearFormulario()
  }

  ngOnInit(): void {
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

  loadForm(){
    this.form.reset({
      name:'',
      email:'',
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
      let form:any = this.form.value;
      delete form.passwordConfirm;
      this.http.registrarUsuario(form).subscribe(
        resp => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario creado con éxito',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(() => {
            this.router.navigate(['/users']);
          }, 1000);
        }     
      );       
    }else{
      this.form.markAllAsTouched()
    }
  }

  
}
