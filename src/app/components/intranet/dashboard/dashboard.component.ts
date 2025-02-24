import { Component, OnInit } from '@angular/core';
import Institutions from '../../../Models/Institutions';
import { ColegioService } from '../../../services/intranet/colegios/colegio.service';
import { LoginService } from '../../../services/intranet/login/login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Event from '../../../Models/Event';
import { EventIntranetService } from '../../../services/intranet/events/eventIntranet.service';
import Multimedia from '../../../Models/Multimedia';
import { MultimediaService } from '../../../services/intranet/multimedias/multimedia.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  types = [
    { value: 'Image', label: 'Imagen' },
    { value: 'Video', label: 'Video' },
  ];

  institucion!: Institutions;
  eventsForm: FormGroup;
  multimediaForm: FormGroup;
  update: boolean = false;

  events: any[] = [];
  eventUpdate: Event = {
    institution_id: 0,
    title: '',
    description: '',
  }

  // Nuevo estado de multimedia para cada evento
  addMultimediaState: { [key: number]: boolean } = {};

  constructor(
    private readonly colegioService: ColegioService,
    private readonly eventService: EventIntranetService,
    private readonly loginService: LoginService,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly multimediaService: MultimediaService,
  ) {
    this.eventsForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(3)]],
    });
    this.multimediaForm = this.fb.group({
      type: ['', [Validators.required, Validators.minLength(3)]],
      url: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.getColegio();
    this.getAllEvents();
  }

  // Función para activar o desactivar el formulario de multimedia para un evento específico
  toggleMultimedia(eventId: number) {
    this.addMultimediaState[eventId] = !this.addMultimediaState[eventId];
    if (this.addMultimediaState[eventId]) {
      this.multimediaForm.reset();
    }
  }

  async getColegio() {
    this.colegioService.getColegiosByUserAuth().subscribe({
      next: (res) => {
        this.institucion = res.data[0];
      },
    })
  }

  async getAllEvents() {
    this.eventService.getEventsByInstitucion().subscribe({
      next: (res) => {
        this.events = res.data;
      }
    })
  }

  agregarEvento() {
    if (this.eventsForm.valid) {
      const event: Event = {
        title: this.eventsForm.get('title')?.value,
        description: this.eventsForm.get('description')?.value,
        institution_id: this.institucion.id
      }

      this.eventService.saveEvent(event).subscribe({
        next: (res) => {
          console.log(res);
          this.events = [];
          this.getAllEvents();
          this.eventsForm.reset();
        }
      })
    }
  }

  editEvento(event: Event) {
    this.eventsForm.get('title')?.setValue(event.title);
    this.eventsForm.get('description')?.setValue(event.description);
    this.update = true;
    this.eventUpdate = {
      id: event.id!,
      title: this.eventsForm.get('title')?.value,
      description: this.eventsForm.get('description')?.value,
      institution_id: event.institution_id!
    }
  }

  updateEvento() {
    this.eventUpdate = {
      id: this.eventUpdate.id!,
      title: this.eventsForm.get('title')?.value,
      description: this.eventsForm.get('description')?.value,
      institution_id: this.eventUpdate.institution_id
    }

    console.log(this.eventUpdate)

    this.eventService.editEvent(this.eventUpdate).subscribe({
      next: () => {
        this.events = [];
        this.getAllEvents();
        this.eventsForm.reset();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Evento actualizado!',
          showConfirmButton: false,
          timer: 1500
        });
      },
      error: () => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al actualizar el evento!',
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

  cancelUpdate() {
    this.update = false;
    this.eventsForm.reset();
  }

  deleteById(id: number) {
    this.eventService.deleteEventById(id).subscribe({
      next: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Evento eliminado!',
          showConfirmButton: false,
          timer: 1500
        });
        this.events = [];
        this.getAllEvents();
      },
      error: () => {
        Swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Error al eliminar el evento!',
          showConfirmButton: false,
          timer: 1500
        });
      }
    })
  }

  saveMultimedia(id: number) {
    const multimedia: Multimedia = {
      type: this.multimediaForm.get('type')?.value,
      url: this.multimediaForm.get('url')?.value,
      event_id: id
    }

    this.multimediaService.saveMultimedia(multimedia).subscribe({
      next: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Elemento multimedia agregado!',
          showConfirmButton: false,
          timer: 1500
        });
        this.events = [];
        this.getAllEvents();
        this.addMultimediaState[id] = false; // Cerrar el formulario al agregar multimedia
      }
    });
  }

  cancelarMultimedia(eventId: number) {
    this.addMultimediaState[eventId] = false;
    this.multimediaForm.reset();
  }

  deleteMultimediaById(multimediaId: number) {
    this.multimediaService.deleteMultimedia(multimediaId).subscribe({
      next: () => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Elemento multimedia eliminado!',
          showConfirmButton: false,
          timer: 1500
        });
        this.events = [];
        this.getAllEvents();
      }
    })
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/login']);
  }
}
