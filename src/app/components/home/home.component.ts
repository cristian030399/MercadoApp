import { Component, OnInit } from '@angular/core';
import { MercadolibreService, Producto } from 'src/app/services/mercadolibre.service';
import { log } from 'util';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  productos: any[] = [];
  imagenes: any[] = [];
  vendedores: any[] = [];
  busqueda: string;
  totalPaginas = 1;

  constructor(private _mercadolibreService: MercadolibreService) {
  }

  buscarProductos(busqueda: string, pestana = 1) {
    this.busqueda = busqueda;
    this.productos = [];
    this._mercadolibreService.getProductos(busqueda, ((pestana - 1) * 50))
      .subscribe((data: any) => {
        this.productos = data.results;
        this.totalPaginas = data.paging.total;
        this.llenarImagenes();
        this.llenarVendedores();
      });
  }

  async llenarImagenes() {
    this.imagenes = this.productos.map(producto => {
      return this._mercadolibreService.getImagen(producto.id)
        .subscribe((data1: any) => {
          this.imagenes[this.productos.indexOf(producto)] = data1;
        });
    });
  }

  async llenarVendedores() {
    this.vendedores = this.productos.map(producto => {
      return this._mercadolibreService.getNickname(producto.seller.id)
        .subscribe((data2: any) => {
          this.vendedores[this.productos.indexOf(producto)] = data2;
        });
    });
  }

}
