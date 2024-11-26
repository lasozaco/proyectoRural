import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import Event from '../../Models/Event'
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  url: string
  constructor(private readonly httpClient: HttpClient) {
    this.url = environment.url
  }

  getInstitutionById(id: number): Observable<Event[]> {
    return this.httpClient.get<Event[]>(this.url+'events/'+id);
  }
}
