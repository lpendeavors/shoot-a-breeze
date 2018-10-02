import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginErrorMessage: string;

  loginForm = this.fb.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.compose([Validators.required])]
  })

  constructor(public auth: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    if (this.loginForm.valid) {
      this.loginErrorMessage = null;

      const email = this.loginForm.controls['email'].value;
      const password = this.loginForm.controls['password'].value;
      
      this.auth.login(email, password)
        .then(response => this.router.navigate(['/admin']) )
        .catch(error => this.loginErrorMessage = error.message );
    }
  }

}
