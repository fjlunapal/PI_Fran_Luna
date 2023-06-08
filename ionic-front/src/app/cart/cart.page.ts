import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { Producto } from '../services/interfaces/Producto';
import { MenuController } from '@ionic/angular';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';

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
    private alertController: AlertController,
    private emailComposer: EmailComposer
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
    if (this.finalCart.length === 0) {
      return;
    }

    const content: any[] = [];

    content.push({ text: 'MARRUZELLA', style: 'header' });
    content.push('Teléfono: 956 34 50 72');
    content.push('\n');

    content.push({ text: 'Resumen del Pedido', style: 'header' });
    content.push('\n');

    const orderSummary: any[] = [];
    let totalPrice = 0;

    this.finalCart.forEach((item: any) => {
      const { nombre, cantidad, precioTotal } = item;
      const itemSummary = `${nombre} x ${cantidad}: ${precioTotal.toFixed(
        2
      )} €`;
      orderSummary.push(itemSummary);
      totalPrice += precioTotal;
    });

    content.push({ text: 'Productos:', style: 'subheader' });
    orderSummary.forEach((item: any) => {
      content.push('- ' + item);
    });

    content.push('\n');
    content.push({ text: `Total: ${totalPrice.toFixed(2)} €`, style: 'total' });

    const documentDefinition = {
      content: content,
      defaultStyle: {
        fontSize: 12,
      },
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 15, 0, 5],
        },
        total: {
          fontSize: 16,
          bold: true,
          margin: [0, 30, 0, 0],
        },
      } as CustomStyles,
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
            recursive: true,
          });

          console.log('PDF guardado:', result.uri);
          const toast = await this.toastController.create({
            message: 'El PDF se guardó exitosamente en el dispositivo.',
            duration: 2000,
          });
          toast.present();

          // Configurar el correo electrónico
          const email = {
            attachments: [result.uri],
            subject: 'Resumen del pedido',
            body: 'Adjunto encontrarás el PDF del pedido.',
            isHtml: true,
            app: 'Gmail',
          };

          // Enviar el correo electrónico
          this.emailComposer.open(email);
        };

        reader.readAsBinaryString(blob);
      });
    } catch (error) {
      console.error('Error al generar o guardar el PDF:', error);
    }
  }
}
