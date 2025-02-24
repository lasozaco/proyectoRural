import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { decrypt } from '../../../utils/util-encrypt';
import Multimedia from '../../../Models/Multimedia';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {

  url: string = "";
  tk: string = "";

  constructor(private readonly httpClient: HttpClient) {
    this.url = environment.url;
  }

  validateAndDecryptToken() {
    try {
      this.tk = decrypt(sessionStorage.getItem('tk')!);
    } catch (error) {
      console.log(error);
    }
  }

  getAllMultimediaByEvent(multimedia: Multimedia) {
    this.validateAndDecryptToken();
    this.httpClient.post(this.url + 'multimedia', multimedia, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }
    })
  }

  saveMultimedia(multimedia: Multimedia) {
    this.validateAndDecryptToken();
    return this.httpClient.post(this.url + 'multimedia', multimedia, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }
    })
  }

  deleteMultimedia(id: number) {
    this.validateAndDecryptToken();
    return this.httpClient.delete(this.url + 'multimedia/' + id, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }
    })
  }

}
