import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor(public dataService: DataService, private router: Router) {}
  products: any;
  filterProducts: any;

  ngOnInit() {
    this.dataService.getProducts().then((products: any) => {
      this.products = products;
      console.log(this.products);
    }
    )
  }

  async cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
  
  productsFilter(event: any) {
    const textoBusqueda = event.detail.value;

    if (textoBusqueda && textoBusqueda.trim() !== '') {
      this.filterProducts = this.products.filter((product: { nombre: string; }) =>
        product.nombre.toLowerCase().includes(textoBusqueda.toLowerCase())
      );
      console.log(this.filterProducts);
    } else {
      this.filterProducts = [];
    }
  }
}


