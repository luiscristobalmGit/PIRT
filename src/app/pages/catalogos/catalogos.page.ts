import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalogos',
  templateUrl: './catalogos.page.html',
  styleUrls: ['./catalogos.page.scss'],
  standalone: false,
})
export class CatalogosPage implements OnInit {

  catalogos = [
    { nombre: 'Tipos de Usuario' },
    { nombre: 'Departamentos' },
    { nombre: 'Categorías' },
  ];
  constructor() { }

  ngOnInit() {
  }

}
