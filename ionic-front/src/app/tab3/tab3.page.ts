import { Component, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core/components';
import { IonModal, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  @ViewChild(IonModal, { static: false }) public modal!: IonModal;
  pedidos: any;
  productos: any[];
  userId: any;
  totalPedido: number = 0;
  comentario: any;
  stars: any[] = [1, 2, 3, 4, 5];
  selectedStars: number = 0;
  starIcon: string = 'star-outline';
  starOutlineIcon: string = 'star-outline';
  isModalOpen: any;
  pedidoModal: any;  

  constructor(
    public dataService: DataService,
    private router: Router,
    private modalCtrl: ModalController  ) {
    this.productos = [];
  }

  ngOnInit() {
    this.loadPedidosData();
  }

  loadPedidosData() {
    this.dataService.getPedidos().then((pedidos: any) => {
      this.pedidos = pedidos;
      console.log('pedidos', pedidos);

      const promises = this.pedidos.map((pedido: any) => {
        return this.dataService.getOrderHistory(pedido.id);
      });

      Promise.all(promises).then((productosArrays: any[]) => {
        this.productos = [];
        productosArrays.forEach((productos: any[]) => {
          this.productos.push(...productos);
        });
        console.log('productos', this.productos);
      });
    });
  }

  calcularPrecioTotal(pedidoId: number): number {
    let totalPedido = 0;
    for (let producto of this.productos) {
      if (producto.pedido === pedidoId) {
        totalPedido += producto.precioProducto * producto.cantidad;
      }
    }
    return totalPedido;
  }

  handleRefresh(event: any) {
    setTimeout(() => {
      this.loadPedidosData();
      event.target.complete();
    }, 2000);
  }

  cancel() {
    this.isModalOpen = -1;
    this.router.navigate(['/tabs/tab3']);
    this.modalCtrl.dismiss();
  }

  confirm(pedidoId: any) {
    this.modal.dismiss(this.comentario, 'confirmar');
    this.dataService.putOrderDetails(
      pedidoId,
      this.comentario,
      this.selectedStars
    );
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    this.selectedStars = 0;
    this.comentario = '';
  }

  setOpen(isOpen: boolean, pedido: any) {
    this.isModalOpen = pedido.id;
    this.pedidoModal = pedido;
  }

  selectStar(starCount: number) {
    this.selectedStars = starCount;
    console.log('stars', this.selectedStars);
  }

  //este metodo recoge los productoCarrito con el id del pedido y los vuelve a añadir al carrito
  repetirPedido(pedido: any) {
    this.dataService.deleteCart();
    this.dataService.getProducts().then((productos: any) => {
      this.productos
        .filter((producto: any) => {
          return producto.pedido === pedido.id;
        })
        .forEach((producto: any) => {
          productos.forEach((productoApi: any) => {
            if (productoApi.id === producto.producto) {
            for (let i = 0; i < producto.cantidad; i++){
              this.dataService.addProductoCarrito(productoApi);
            }
            }
          });
        });
    });
  }

  async cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
    this.dataService.productosCarrito = [];
  }
}
