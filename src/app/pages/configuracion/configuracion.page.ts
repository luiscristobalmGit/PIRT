import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
  standalone: false,
})
export class ConfiguracionPage implements OnInit {
  config = {
    notificaciones: true,
    modoOscuro: false,
    idioma: 'es'
  };

  constructor() { }

  guardarConfiguracion() {
    console.log('Configuración guardada:', this.config);
  }
  
  ngOnInit() {
  }

}
