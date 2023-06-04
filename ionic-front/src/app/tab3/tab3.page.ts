import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Producto } from '../services/interfaces/Producto';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  pedidos: any;

  constructor(public dataService: DataService, private router: Router) {

  }

  ngOnInit() {
    this.dataService.getOrderHistory(1).then((productos: any) => {
      console.log('productos', productos);
    });
    this.dataService.getPedidos().then((pedidos: any) => {
      this.pedidos = pedidos;
      console.log('pedidos', pedidos);
    });
  }



  async cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
