import { detallePedido } from "./detalle-pedido";

export class pedido{
    CustomerID: string;
    CustomerName: string;
    OrderID: string;
    OrderDate: Date;
    RequiredDate: Date;
    ShippedDate: Date;
    Freight: number;

    public Order_Details: detallePedido[];
}