import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { decrypt } from '../../../utils/util-encrypt';
import { Observable } from 'rxjs';
import { Pageable } from '../../../utils/Pageable';
import Event from '../../../Models/Event';

@Injectable({
  providedIn: 'root'
})
export class EventIntranetService {

  url: string = ""
  tk: string = ""

  constructor(
    private readonly httpClient: HttpClient
  ) {
    this.url = environment.url;
    this.validateAndDecryptToken();
  }

  validateAndDecryptToken() {
    try {
      this.tk = decrypt(sessionStorage.getItem('tk')!);
    } catch (error) {
      console.log(error);
    }
  }

  getEventsByInstitucion(): Observable<Pageable<Event[]>> {
    return this.httpClient.get<Pageable<Event[]>>(this.url + 'event', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }
    })
  }

  saveEvent(event: Event): Observable<Event> {
    return this.httpClient.post<Event>(this.url + 'event', event, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }
    }
    );
  }

  editEvent(event: Event) {
    return this.httpClient.put(`${this.url}event/${event.id}`, event, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }
    })
  }

  deleteEventById(id: number) {
    return this.httpClient.delete(this.url + 'event/' + id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }
    })
  }

}
