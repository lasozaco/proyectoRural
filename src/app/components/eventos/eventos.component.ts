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
  styleUrl: './eventos.component.css'
})
export class EventosComponent implements OnInit {
  url: string
  events: EventsPublic[] = [];
  id: string = ''
  colegioName: string = ''

  constructor
    (private readonly eventsService: EventsService,
      private readonly router: ActivatedRoute,
      private readonly sanitizer: DomSanitizer
    ) {
    this.url = environment.url
  }


  ngOnInit() {
    this.getColegioById(this.router.snapshot.paramMap.get('id')!)
  }

  getColegioById(id: string) {
    this.eventsService.getInstitutionById(Number(id)).subscribe({
      next: (res) => {
        console.log(res)
        this.events = res;
        this.colegioName = res[0].institution.name
      },
      error: () => {
        this.colegioName = '';
      }
    })
  }

}
