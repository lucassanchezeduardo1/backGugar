import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosModule } from './usuarios/usuarios.module';
import { NotificacionesModule } from './notificaciones/notificaciones.module';
import { RutasModule } from './ruta/ruta.module';
import { AuthModule } from './auth/auth/auth.module';

import { PedidosModule } from './pedidos/pedidos.module';
import { ClientesModule } from './clientes/clientes.module';
import { PreciosModule } from './precios/precios.module';
import { VentasModule } from './ventas/ventas.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST || 'mysql.railway.internal',
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'railway',
  autoLoadEntities: true,
  synchronize: true,
  connectorPackage: 'mysql2',
  // 👇 CONFIGURACIÓN PARA RAILWAY:
  connectTimeout: 60000,
  acquireTimeout: 60000,
  extra: {
    ssl: false,  // 👈 DESHABILITA SSL temporalmente
    connectionLimit: 10,
    connectTimeout: 60000
  }
}),
    UsuariosModule,
    NotificacionesModule,
    RutasModule,
    AuthModule,
    ScheduleModule.forRoot(),
    PedidosModule,
    ClientesModule,
    PreciosModule,
    VentasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
