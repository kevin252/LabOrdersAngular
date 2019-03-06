import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { pedido } from '../model/pedido';
import { producto } from '../model/productos';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }

  getPedidos(): Observable<pedido[]>
  {
    return this.http.get<pedido[]>(environment.URLSERVICIO+"/Orders");
  }

  eliminarPedido(order: pedido) :Observable<any>{
    return this.http.delete(environment.URLSERVICIO+"/Orders/"+order.OrderID);
  }

  getPedidoFilter(id: string): Observable<pedido[]>
  {
    debugger;
    if(id=="")
    {
      return this.getPedidos();
    }else
    {
      return this.http.get<pedido[]>(environment.URLSERVICIO+"/Orders/"+id);
    }
  }

  getProductos(): Observable<producto[]>
  {
    return this.http.get<producto[]>(environment.URLSERVICIO+"/Product");
  }

  agregarPedido(unPedido:pedido): any
  {
    debugger;
    let body=JSON.stringify(unPedido);
    let headers= new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
    return this.http.post<pedido>(environment.URLSERVICIO+"/Orders",unPedido,{headers:headers});
  } 
}
