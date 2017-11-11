import { Component, OnInit } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import { EmpleadoService} from '../service/empleado.service';
import { Empleado} from '../service/empleados.model';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-empleado-lista',
  templateUrl: './empleado-lista.component.html',
  styleUrls: ['./empleado-lista.component.css']
})
export class EmpleadoListaComponent implements OnInit {
  empleadoList:Empleado[];
  displayedColumns = ['nombre', 'posicion', 'oficina', 'salario'];
  dataSource:MatTableDataSource<Empleado>;
  constructor(private empleadoService:EmpleadoService) { }

  ngOnInit() {
    var x = this.empleadoService.getDatos();
    x.snapshotChanges().subscribe(item => {
      this.empleadoList = [];
      item.forEach(element => {
        var y = element.payload.toJSON();
        y['$key'] = element.key;
        this.empleadoList.push(y as Empleado);
        this.dataSource = new MatTableDataSource<Empleado>(this.empleadoList);
      });
    });
  }

  onItemClick(emp:Empleado) {
    this.empleadoService.selectedEmpleado = Object.assign({}, emp);
  }
}
