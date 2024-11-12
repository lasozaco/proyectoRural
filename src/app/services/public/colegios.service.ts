import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pageable } from '../../utils/Pageable';
import Institutions from '../../Models/Institutions';

@Injectable({
  providedIn: 'root'
})
export class ColegiosService {
url:string
  constructor(private httpClient:HttpClient) {this.url=environment.url }

  getColegios(params:string):Observable<Pageable<Institutions[]>>{
    return this.httpClient.get<Pageable<Institutions[]>>(this.url+'/institutions'+params);
  }
}
