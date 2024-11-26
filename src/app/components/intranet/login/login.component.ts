import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../services/intranet/login/login.service';
import Login from '../../../Models/Login';
import User from '../../../Models/User';
import { encrypt } from '../../../utils/util-encrypt';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user!: User

  constructor(
    private fb: FormBuilder,
    private readonly loginService: LoginService,
    private readonly router: Router,
  ) {
    this.loginForm = this.fb.group({
      user: ['', [Validators.required, Validators.email, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  ngOnInit(): void {
    if(sessionStorage.getItem('tk')){
      this.router.navigate(['/dashboard']);
    }else{
      this.router.navigate(['/login']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const login: Login = {
        email: this.loginForm.get('user')?.value,
        password: this.loginForm.get('password')?.value
      }
      this.loginService.login(login).subscribe({
        next: (res) => {
          this.user = res;
          sessionStorage.setItem('tk', encrypt(res.token));
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Usuario autorizado!',
            showConfirmButton: false,
            timer: 1500
          });
          this.router.navigate(['/dashboard']);
        },
        error:(error)=>{
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: error.error.message,
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
    } 
  }
}
