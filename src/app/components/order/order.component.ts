import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { pedido } from '../../model/pedido';
import { detallePedido } from '../../model/detalle-pedido';

@Component({
  selector: 'order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  public pedidos: pedido[];
  public lineas: detallePedido[];
  private accion: string;
  modalReference: any;

  constructor(private service: OrderService, private modalService: NgbModal) { }

  ngOnInit() {
    this.getPedidos();
  }

  getPedidos(): void
  {
    this.service.getPedidos()
    .subscribe(
      data=>{
        console.log(data);
        this.pedidos=data;
      },
      error=>{
        console.log(error);
      }
    );
  }

  verDetalles(order:pedido):void
  {
    console.log(order);

    this.lineas=[];
    for(let i=0;i<order.Order_Details.length;i++)
    {
      this.lineas.push
      (
        {
          OrderID: order.Order_Details[i].OrderID,
          ProductID: order.Order_Details[i].ProductID,
          ProductName: order.Order_Details[i].ProductName,
          UnitPrice: order.Order_Details[i].UnitPrice,
          Quantity: order.Order_Details[i].Quantity
        }
      );
    }
    console.log(this.lineas);
  }

  open(content,unPedido:pedido,estado:string)
  {
    this.accion=estado;

    if(unPedido)
    {
      this.verDetalles(unPedido);
    }else
    {
      this.lineas=[];
    }

    this.modalReference=this.modalService.open(content).result.then(
      (result)=>
      {
        console.log("closed");
      }, (reason)=>
      {
        console.log("dismissed");
      }
    );
  }

  eliminarPedido(unPedido:pedido)
  {
    this.service.eliminarPedido(unPedido)
    .subscribe
    (
      (x)=>x
    );
    this.pedidos=this.pedidos.filter(h=>h !== unPedido);
  }

  buscarPedido(id: string): void
  {
    this.service.getPedidoFilter(id)
    .subscribe(
      data=>{
        this.pedidos=data;
      }
    );
  }
}
