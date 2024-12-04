import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/public/events.service';
import { environment } from '../../../environments/environment.development';
import { ActivatedRoute } from '@angular/router';
import EventsPublic from '../../Models/EventsPublic';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {
  url: string;
  events: EventsPublic[] = [];
  id: string = '';
  colegioName: string = '';
  colegioLogo: string = '';  // Variable para el logo

  constructor(
    private readonly eventsService: EventsService,
    private readonly router: ActivatedRoute,
    private readonly sanitizer: DomSanitizer
  ) {
    this.url = environment.url;
  }

  ngOnInit() {
    this.getColegioById(this.router.snapshot.paramMap.get('id')!);
  }

  getColegioById(id: string) {
    this.eventsService.getInstitutionById(Number(id)).subscribe({
      next: (res) => {
        console.log(res);
        this.events = res;
        this.colegioName = res[0].institution.name;
        this.colegioLogo = res[0].institution.logo;  // Obtener el logo de la institución
      },
      error: () => {
        this.colegioName = '';
        this.colegioLogo = '';  // Si hay error, dejamos vacío el logo
      }
    });
  }

  /**
   * Convierte cualquier URL de YouTube en una URL incrustada válida.
   * @param url La URL del video.
   * @returns Una URL segura para usar en un iframe.
   */
  convertToEmbedUrl(url: string): SafeResourceUrl {
    try {
      const parsedUrl = new URL(url);

      // Detecta si la URL pertenece a YouTube.
      if (parsedUrl.hostname.includes('youtube.com') || parsedUrl.hostname.includes('youtu.be')) {
        let videoId = '';

        // Procesa URLs tipo "youtu.be/VIDEO_ID".
        if (parsedUrl.hostname === 'youtu.be') {
          videoId = parsedUrl.pathname.substring(1); // Extrae el ID del video desde el path.
        } 
        // Procesa URLs tipo "youtube.com/watch?v=VIDEO_ID".
        else if (parsedUrl.searchParams.has('v')) {
          videoId = parsedUrl.searchParams.get('v')!;
        } 
        // Procesa URLs ya en formato incrustado.
        else if (parsedUrl.pathname.includes('/embed/')) {
          return this.sanitizer.bypassSecurityTrustResourceUrl(url); // Ya es un enlace válido.
        }

        // Si se obtuvo un video ID, genera la URL incrustada.
        if (videoId) {
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;
          return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
        }
      }

      // Si no es un enlace de YouTube válido, retorna la URL sin cambios.
      console.warn('URL no válida o no soportada para incrustar:', url);
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } catch (error) {
      console.error('Error al procesar la URL:', error);
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }
}
