import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Producto } from '../services/interfaces/Producto';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { StyleDictionary } from 'pdfmake/interfaces';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { ToastController } from '@ionic/angular';

interface CustomStyles {
  [key: string]: {
    fontSize: number;
    bold?: boolean;
    margin?: [number, number, number, number];
  };
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  constructor(
    private router: Router,
    public dataService: DataService,
    private menuController: MenuController,
    private toastController: ToastController,
  ) {
    (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
  }

  products: any;
  showCart: any[] = [];
  finalCart: any;
  totalPrice: number = 0;

  ngOnInit() {
    this.showCart = this.calculateSameProducts();
    console.log(this.showCart);
  }

  public calculateSameProducts(): any[] {
    const groupedCart: any[] = [];
    const groupedProducts: any = {};

    // Agrupar productos por ID y calcular la suma de los precios
    for (const product of this.dataService.productosCarrito) {
      if (groupedProducts[product.id]) {
        groupedProducts[product.id].cantidad++;
        groupedProducts[product.id].precioTotal += product.precio;
      } else {
        groupedProducts[product.id] = {
          ...product,
          cantidad: 1,
          precioTotal: product.precio,
        };
      }
    }

    // Crear un array con los productos agrupados
    for (const key in groupedProducts) {
      if (groupedProducts.hasOwnProperty(key)) {
        groupedCart.push(groupedProducts[key]);
      }
    }

    this.finalCart = groupedCart;

    return groupedCart;
  }

  public getTotalPrice() {
    this.totalPrice = this.dataService.getTotalPrice();
    return this.totalPrice;
  }

  public async createOrder() {
    this.dataService.createOrder(this.finalCart);
  }

  public async openMenu() {
    await this.menuController.open('cartMenu');
  }

  addProduct(producto: Producto) {
    this.dataService.addProductoCarrito(producto);
    this.showCart = this.calculateSameProducts();
    this.updateCart();
  }

  deleteProduct(producto: Producto) {
    this.dataService.deleteProductoCarrito(producto);
    this.showCart = this.calculateSameProducts();
    this.updateCart();
  }

  updateCart() {
    this.showCart = this.calculateSameProducts();
    this.updateFinalCart();
  }

  updateFinalCart() {
    this.finalCart = this.showCart;
  }

  async cerrarSesion() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  async generatePdf() {
    console.log('entraenpdf');
    const content: any[] = [];

    // Encabezado
    content.push({ text: 'Resumen del Pedido', style: 'header' });
    content.push('\n'); // Espacio en blanco

    // Información del pedido
    const orderSummary: any[] = [];
    let totalPrice = 0;

    this.finalCart.forEach((item: any) => {
      const { nombre, cantidad, precioTotal } = item;
      const itemSummary = `${nombre} x ${cantidad}: ${precioTotal.toFixed(2)} €`;
      orderSummary.push(itemSummary);
      totalPrice += precioTotal;
    });

    // Agregar resumen de artículos al contenido del PDF
    content.push({ text: 'Productos:', style: 'subheader' });
    orderSummary.forEach((item: any) => {
      content.push('- ' + item);
    });

    // Total
    content.push('\n'); // Espacio en blanco
    content.push({ text: `Total: ${totalPrice.toFixed(2)} €`, style: 'total' });

    const documentDefinition = {
      content: content,
      defaultStyle: {
        fontSize: 12
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 5] // Margen superior, derecho, inferior, izquierdo
        },
        total: {
          fontSize: 16,
          bold: true,
          margin: [0, 30, 0, 0] // Margen superior, derecho, inferior, izquierdo
        }
      } as CustomStyles // Utilizamos el tipo personalizado
    };

    try {
      const pdfDocGenerator = pdfMake.createPdf(documentDefinition);

      pdfDocGenerator.getBlob(async (blob: Blob) => {
        const reader = new FileReader();

        reader.onloadend = async () => {
          const base64Data = btoa(reader.result as string);

          const result = await Filesystem.writeFile({
            path: 'pedido.pdf',
            data: base64Data,
            directory: Directory.Documents,
            recursive: true
          });

          console.log('PDF guardado:', result.uri);

          // Muestra un mensaje de éxito utilizando ToastController
          const toast = await this.toastController.create({
            message: 'El PDF se guardó exitosamente en el dispositivo.',
            duration: 2000
          });
          toast.present();
        };

        reader.readAsBinaryString(blob);
      });
    } catch (error) {
      console.error('Error al generar o guardar el PDF:', error);
    }
  }

 
}
