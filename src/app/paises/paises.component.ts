import { Component, OnInit } from '@angular/core';
import { PaisesService } from '../paises.service';

@Component({
  selector: 'app-paises',
  templateUrl: './paises.component.html',
  styleUrls: ['./paises.component.scss']
})
export class PaisesComponent implements OnInit {

  paises!: Array<any>;
  page = 0;
  size = 10;
  order = "id";
  asc = true;

  isFirst: boolean = false;
  isLast: boolean = false;
  totalPages!: Array<number>;

  //Inyección de PaisesService para utilizar sus métodos.
  //El método de PaisesService devuelve un observable.
  constructor(private paisesService: PaisesService) { }

  ngOnInit(): void {
    this.cargarPaises();
  }

  //Cada vez que se refrescan los datos en la tabla, ejecutaremos este método.
  cargarPaises(){
    this.paisesService.paises(this.page, this.size, this.order, this.asc).subscribe(
      data => {
        this.paises =  data.content;
        this.isFirst = data.first;
        this.isLast = data.last;
        this.totalPages = new Array(data['totalPages']);

        console.log(data);
      },
      err => {
        console.log(err.error);
      }
    ); //Hay que subscribirse porque es un observable.
  }

  //Ordenar de manera ascendente o descendente.
  sort(): void{
    this.asc = !this.asc;
    this.cargarPaises();
  }

  //Ir a Página anterior si no es la primera página.
  rewind():void{
    if(!this.isFirst){
      this.page--;
      this.cargarPaises();
    }
    else{
      alert('Es la primera página');
    }
  }

  //Página siguiente si no es la última.
  fordward():void{
    if(!this.isLast){
      this.page++;
      this.cargarPaises();
    }
    else{
      alert('Es la última página');
    }
  }

  //Numerar páginas
  setPage(page: number): void{
    this.page = page;
    this.cargarPaises();
  }

  //Orden by
  setOrder(order: string){
    this.order = order;
    this.cargarPaises();
  }

}
