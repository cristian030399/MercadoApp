import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {

  pagina = 1;
  @Input() totalPaginas = 1;
  @Output() siguientePagina: EventEmitter<number>;


  constructor() { 
    this.siguientePagina = new EventEmitter();
  }

  pasarPagina(i: number){
    this.pagina = this.pagina + i;
    this.siguientePagina.emit(this.pagina);
  }

}
