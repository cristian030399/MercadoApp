import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Output() busqueda: EventEmitter<string>;

  constructor() {
    this.busqueda = new EventEmitter();
  }

  ngOnInit() {
  }

  buscarProducto(termino: string){
    this.busqueda.emit(termino);
  }

}
