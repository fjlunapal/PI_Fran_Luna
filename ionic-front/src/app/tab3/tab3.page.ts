import { Component } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { Producto } from '../services/interfaces/Producto';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  pedidos: any;
  productos: any[];
  userId: any;
  constructor(public dataService: DataService, private router: Router) {
    this.productos = []; 
  }

  async ngOnInit() {
    this.dataService.getPedidos().then((pedidos: any) => {
      this.pedidos = pedidos;
      console.log('pedidos', pedidos);

      const promises = this.pedidos.map((pedido: any) => {
        return this.dataService.getOrderHistory(pedido.id);
      });

      Promise.all(promises).then((productosArrays: any[]) => {
        productosArrays.forEach((productos: any[]) => {
          this.productos.push(...productos);
        });
        console.log('productos', this.productos);
      });
    });
  }

  getTotalPrice(pedidoId: any) {
    let total = 0;
    const productosPedido = this.productos.filter(producto => producto.pedido === pedidoId);
    productosPedido.forEach((productocarrito) => {
      console.log()
    });
  }
  
  }

