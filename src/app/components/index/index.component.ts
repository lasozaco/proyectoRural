import { Component } from '@angular/core';
import Institutions from "../../Models/Institutions";
import {ColegiosService} from "../../services/public/colegios.service";
import {CommonModule} from "@angular/common";
import {EventsService} from "../../services/public/events.service";
import Event from "../../Models/Event";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  params: string = ''
  colegios: Institutions[] = [];
  event: Event[]=[];

  constructor(
      private readonly colegiosService: ColegiosService,
      private readonly eventsService: EventsService) {
  }

  ngOnInit(): void {
    this.getColegios();
  }

  getColegios() {
    this.colegiosService.getColegios(this.params).subscribe({
      next: (res) => {
        this.colegios = res.data
        console.log(res.data)
      },
      error: (res) => {
        console.error(res.error)
      }
    })
  }

}
