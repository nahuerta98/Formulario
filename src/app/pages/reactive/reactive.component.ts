import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma: FormGroup;
  // Form Builder -> Servicio, nos ayuda a crear formulario facilmente.
  constructor( private fb: FormBuilder) { 

    this.crearFormulario();
  }

  ngOnInit(): void {
  }
  //Getter -> forma de obtener una propiedad ( PROCESAR LA INFORMACIÓN )
  get nombreNoValido(){
    return this.forma.get('nombre').invalid && this.forma.get('nombre').touched
  }

  get apellidoNoValido(){
    return this.forma.get('apellido').invalid && this.forma.get('apellido').touched
  }

  get correoNoValido(){
    return this.forma.get('correo').invalid && this.forma.get('correo').touched
  }

  get calleNoValido(){
    return this.forma.get('direccion.calle').invalid && this.forma.get ('direccion.calle').touched
  }
  get numeroNoValido(){
    return this.forma.get('direccion.numero').invalid && this.forma.get ('direccion.numero').touched
  }
  get coloniaNoValido(){
    return this.forma.get('direccion.colonia').invalid && this.forma.get ('direccion.colonia').touched
  }
  get movilNoValido(){
    return this.forma.get('telefono.movil').invalid && this.forma.get ('telefono.movil').touched
  }

  crearFormulario(){
    //Aqui comenzamos a definir nuestro formulario.
    //Valores síncronos, no requieren interacción con servicios web.
    this.forma = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(5)] ],
      apellido:['', [Validators.required] ],
      correo:['', [ Validators.required,Validators.email]],
      direccion: this.fb.group({
        calle: ['', Validators.required],
        numero: ['', Validators.required],
        colonia: ['', Validators.required]
      }),
      telefono: this.fb.group({
        movil: ['', [Validators.required, Validators.minLength(8)]]
      })
    });

  }


  guardar(){
    console.log(this.forma);

    if (this.forma.invalid){

      return Object.values (this.forma.controls).forEach(control=>{

        if (control instanceof FormGroup){
          Object.values (control.controls). forEach(control => control.markAsTouched());
        } else{
          control.markAsTouched();
        }
      });
    }
  }

}
