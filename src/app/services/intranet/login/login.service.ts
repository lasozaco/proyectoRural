import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import Login from '../../../Models/Login';
import User from '../../../Models/User';
import { Observable } from 'rxjs';
import { decrypt } from '../../../utils/util-encrypt';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url: string = "";
  tk: string = "";

  constructor(private readonly httpClient: HttpClient) {
    this.url = environment.url
  }

  login(login: Login): Observable<User> {
    return this.httpClient.post<User>(this.url + 'login', login);
  }

  logout() {
    this.tk = decrypt(sessionStorage.getItem('tk')!)
    sessionStorage.removeItem('ut')
    sessionStorage.removeItem('tk')
    return this.httpClient.post(this.url + 'logout', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.tk}`
      }
    })
  }
}
