import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../service/empleado.service';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css'],
})
export class EmpleadoComponent implements OnInit {

  constructor(private empleadoService:EmpleadoService) { }

  ngOnInit() {
    this.resetForm();
  }

  onSubmit(form:NgForm) {
    if(form.value.$key == null)
      this.empleadoService.insertEmpleado(form.value);
    else
      this.empleadoService.updateEmpleado(form.value);
    this.resetForm(form);
  }

  resetForm(form?:NgForm) {
    if(form != null)
      form.reset();
    this.empleadoService.selectedEmpleado = {
      $key:null,
      nombre:'',
      posicion:'',
      oficina:'',
      salario:''
    }
  }

  onDelete(form:NgForm) {
    if(confirm('Estas seguro que quieres eliminar este registro?') == true) {
      this.empleadoService.deleteEmpleado(form.value.$key);
      this.resetForm(form);
    }
  }
}
