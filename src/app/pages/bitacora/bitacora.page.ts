import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bitacora',
  templateUrl: './bitacora.page.html',
  styleUrls: ['./bitacora.page.scss'],
  standalone: false,
})
export class BitacoraPage implements OnInit {

  bitacora = [
    { accion: 'Usuario inició sesión', fecha: new Date() },
    { accion: 'Usuario actualizó su perfil', fecha: new Date() },
    { accion: 'Se registró un nuevo usuario', fecha: new Date() }
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
