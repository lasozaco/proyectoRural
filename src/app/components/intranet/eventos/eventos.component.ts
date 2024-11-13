import {Component, OnInit} from '@angular/core';
import {EventsService} from "../../../services/public/events.service";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export class EventosComponent implements OnInit{
  url: string
  events: Event[]=[];

  constructor(private readonly eventsService: EventsService){
    this.url = environment.url
  }

  ngOnInit() {
    //this.getColegioById();
  }

  getColegioById(id:number){
    this.eventsService.getInstitutionById(id).subscribe({
      next:(res)=>{
        //this.events = res
      }
    })
  }

}
