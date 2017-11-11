import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Empleado } from './empleados.model';

@Injectable()
export class EmpleadoService {
  empleadoList:AngularFireList<any>;
  selectedEmpleado:Empleado = new Empleado();

  constructor(private firebase:AngularFireDatabase) {}

  insertEmpleado(empleado:Empleado) {
    this.empleadoList.push( {
      nombre:empleado.nombre,
      posicion:empleado.posicion,
      oficina:empleado.oficina,
      salario:empleado.salario
    });
  }

  getDatos() {
    this.empleadoList = this.firebase.list('empleados');
    return this.empleadoList;
  }

  updateEmpleado(emp:Empleado) {
    this.empleadoList.update(emp.$key, {
      nombre:emp.nombre,
      posicion:emp.posicion,
      oficina:emp.oficina,
      salario:emp.salario
    });
  }

  deleteEmpleado(key:string) {
    this.empleadoList.remove(key);
  }
}
