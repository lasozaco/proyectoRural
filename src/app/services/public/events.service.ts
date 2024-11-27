import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import Event from '../../Models/Event'
import { environment } from "../../../environments/environment";
import { HttpClient } from "@angular/common/http";
import EventsPublic from '../../Models/EventsPublic';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  url: string
  constructor(private readonly httpClient: HttpClient) {
    this.url = environment.url
  }

  getInstitutionById(id: number): Observable<EventsPublic[]> {
    return this.httpClient.get<EventsPublic[]>(this.url + 'events/' + id);
  }
}
