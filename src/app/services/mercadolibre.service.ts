import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MercadolibreService {
  private url = 'https://api.mercadolibre.com/';

  constructor(private http: HttpClient) { }

  getQuery(query: string): any {
    return this.http.get(this.url + query);
  }

  getNickname(idSeller: string): any {
    return this.getQuery(`users/${idSeller}`).pipe(map(data => data['nickname']));
  }

  getImagen(idProducto: string): any {
    return this.getQuery(`items/${idProducto}`).pipe(map(data => data['pictures'][0].url));
  }

  getProductos(nombre: string, offset = 0) {
    return this.getQuery(`sites/MCO/search?q=${nombre}&offset=${offset}`);
  }

  getResultadoBusqueda(nombre: string, offset?: number): Producto[] {
    let productosArr: Producto[] = [];
    let productosQuery: any;
    let producto: Producto;
    let limit: number;
    let vendedor: string;
    this.getProductos(nombre, offset).subscribe((data: any) => {
      productosQuery = data.results;
      limit = productosQuery.length;

      for (let i = 0; i < limit; i++) {

        console.log(i);
        this.getNickname(productosQuery[i].seller.id).subcribre((data1: any) => {
          console.log(data1);
          /*vendedor = data1.nickname;
          
          this.getImagen(productosQuery[i].id).subscribe((data2: any) =>{
            producto = {
              title: productosQuery[i].title,
              price: productosQuery[i].price,
              nickname: vendedor,
              url_picture: data2
            }
            productosArr.push(producto);
            
          });*/
        });
      }

    });



    /*if (offset) {
      this.getProductos(nombre, offset).subscribe((data: any) => {
        productosQuery = data.results;
        limit = productosQuery.length;
      });
    } else {
      this.getProductos(nombre).subscribe((data: any) => {
        productosQuery = data.results;
        limit = productosQuery.length;
        console.log(limit);
      });
    }*/
    /*for (let i = 0; i < limit; i++) {
      producto.title = productosQuery[i].title;
      producto.price = productosQuery[i].price;
      producto.nickname = this.getNickname(productosQuery[i].idSeller);
      producto.url_picture = this.getImagen(productosQuery[i].id);
      productosArr.push(producto);

    }*/

    return productosArr;
  }
}

export interface Producto {
  title: string;
  price: string;
  nickname?: string;
  url_picture?: string;
}
