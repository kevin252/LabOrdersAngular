import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioComponent } from './usuario/usuario.component';
import { ComponentRoutingModule } from './component-rounting';
import { ThemeModule } from '../@theme/theme.module';
import { ProductoComponent } from './producto/producto.component';
import { PacienteComponent } from './paciente/paciente.component';
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CrearPedidoComponent } from './crear-pedido/crear-pedido.component';
import { OrderComponent } from './order/order.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentRoutingModule,
    ThemeModule,
    ToasterModule,
    Ng2SmartTableModule
  ],
  declarations: [UsuarioComponent, ProductoComponent,PacienteComponent, CrearPedidoComponent, OrderComponent],
  providers: [ToasterService]
})
export class ComponentModule { }
