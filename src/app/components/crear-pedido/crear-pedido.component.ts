import { Component, OnInit } from '@angular/core';
import { producto } from '../../model/productos';
import { pedido } from '../../model/pedido';
import { Cliente } from '../../model/paciente';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomerService } from '../../services/customer.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.scss']
})
export class CrearPedidoComponent implements OnInit {
  modalReference: any;
  public listaProductos: producto[];
  public listaDetalles: any[];
  public registroPedido: pedido;
  public  listaClientes: Cliente[];

  productoSeleccionado: producto;
  clienteSeleccionado: string;
  precioUnitario: number;
  total: number;
  cantidad: number;
  totalPedido: number;
  constructor(private modalService: NgbModal, private service: OrderService,private customerService: CustomerService) 
  {
    this.totalPedido = 0;
    this.listaDetalles = [];
    this.registroPedido = new pedido();
   }

  ngOnInit() 
  {
    this.getProductos();
    this.getCustomers();
  }

  getCustomers(): any
  {
    this.customerService.getCustomer()
    .subscribe(
      data=>{
        this.listaClientes=data;
      },
      error=>{
        console.log(error);
      }
    );
  }

  getProductos():any
  {
    this.service.getProductos()
    .subscribe(
      data=>{
        console.log(data);
        this.listaProductos=data;
      },
      error=>{
        console.log(error);
      }
    );
  }

  open(content)
  {
    this.modalReference= this.modalService.open(content).result.then(
      (result)=>{
        console.log("closed");
      }, (reason)=>{
        console.log("dismissed");
      }
    );
  }

  onChangeProducto(event)
  {
    this.precioUnitario=event.UnitPrice;
  }

  onChangeTotal(valor)
  {
    console.log(valor);
    this.cantidad=valor;
    this.total=valor*this.precioUnitario;
  }

  agregarProducto(product: producto): void
  {
    this.listaDetalles.push
    (
      {
        OrderID: undefined,
        ProductID: `${product.ProductID}`,
        ProductName: product.ProductName,
        UnitPrice: product.UnitPrice,
        Quantity: this.cantidad,
        Total: this.total 
      }
    );
    this.totalPedido= this.totalPedido+this.total;
  }

  agregarPedido(unPedido:pedido):void
  {
    unPedido.Freight= this.totalPedido;
    unPedido.Order_Details= this.listaDetalles;
    unPedido.CustomerID= this.clienteSeleccionado;

    if(this.registroPedido.OrderDate!=undefined && this.registroPedido.RequiredDate !=undefined &&
      this.registroPedido.ShippedDate != undefined && this.registroPedido.Freight !=undefined && this.totalPedido !=0)
    {
      if(unPedido!=null)
      {
        this.service.agregarPedido(unPedido)
        .subscribe(
          data=>  {
            console.log(data);
            this.registroPedido= new pedido();
            this.listaDetalles=[];
            this.totalPedido=0;
          },
          error=>{
            console.log(error);
          }
        );
      }else{
        alert("Pedido no registrado");
      }
    }else{
      alert("Debes llenar todos los campos");
    }
  }
}
