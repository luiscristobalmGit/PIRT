import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatetimeChangeEventDetail } from '@ionic/angular';
import { IonDatetimeCustomEvent } from '@ionic/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-registro-app',
  templateUrl: './registro-app.page.html',
  styleUrls: ['./registro-app.page.scss'],
  standalone: false,
})
export class RegistroAppPage implements OnInit {
  formatoForm!: FormGroup; // Usamos el operador ! para indicar que se inicializará en el ngOnInit
  showDate = false; 
  showDatePicker = false;
  showTimePicker = false; 

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // Verificar autenticación al cargar la página
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
  }

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.formatoForm = this.fb.group({
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
      estatus: ['', Validators.required],
      nombreProyecto: ['', Validators.required],
      areaSolicitante: ['', Validators.required],
      responsable: ['', Validators.required],
      justificacion: ['', Validators.required],
      entorno: ['', Validators.required],
      tamanoArchivosGB: [''],
      lenguajeProgramacion: [''],
      plataformaFrontend: [''],
      plataformaBackend: [''],
      migraVersionPlataformaActual: [''],
      migraNuevaTecnologiaSoftware: [''],
      migraNuevaTecnologiaHardware: [''],
      especificarSoftware: [''],
      especificarHardware: [''],
      bdManejador: ['', Validators.required],
      bdVersion: [''],
      bdMigrarVersionReciente: [''],
      bdNombre: [''],
      bdTamanoInicial: [''],
      bdUsuariosConcurrentes: [''],
      bdTamanoActual: [''],
      bdCrecimiento12Meses: [''],
      bdCriticidad: [''],
      bdTipo: [''],
      bdRespaldo: [''],
      bdDuracionRespaldo: ['']
    });
  }

  onSubmit() {
    if (this.formatoForm.valid) {
      console.log('Datos del formulario:', this.formatoForm.value);
      // Aquí enviarías al backend
    } else {
      console.warn('El formulario no es válido');
      this.markAllAsTouched();
    }
  }

  private markAllAsTouched(): void {
    Object.values(this.formatoForm.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  selectDate() {
    this.showDate = true; 
  }

  openDatePicker() {
    this.showDatePicker = true;
  }

  updateDate(event: IonDatetimeCustomEvent<DatetimeChangeEventDetail>) {
    const selectedDate = event.detail.value;
    this.formatoForm.patchValue({ fecha: selectedDate });
    this.showDatePicker = false;
  }

  openTimePicker() {
    this.showTimePicker = true;
  }

  updateTime(event: IonDatetimeCustomEvent<DatetimeChangeEventDetail>) {
    const selectedTime = event.detail.value;
    this.formatoForm.patchValue({ hora: selectedTime });
    this.showTimePicker = false;
  }
}