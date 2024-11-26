import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment.development';
import Institutions from '../../../Models/Institutions';
import { Pageable } from '../../../utils/Pageable';
import { decrypt } from '../../../utils/util-encrypt';

@Injectable({
  providedIn: 'root'
})
export class ColegioService {

  url: string = "";
  tk: string = "";

  constructor(private readonly httpClient: HttpClient) {
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

  getColegiosByUserAuth(): Observable<Pageable<Institutions[]>> {
    return this.httpClient.get<Pageable<Institutions[]>>(this.url + 'institution', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }
    })
  }

}
