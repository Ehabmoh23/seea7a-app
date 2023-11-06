import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {

    this.form = this.fb.group({
      email: [null, [Validators.required, Validators.pattern(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/)]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@*%$#])[A-Za-z\d@*%$#]{8,}$/)]],
    });

  }

  loginUser() {

    const {email, password} = this.form.getRawValue();

    this.authService.login(email, password)
      .subscribe((res: any) => {
        this.authService.setToken(email, res.token);
        console.log('res => ', res)
        this.router.navigate(['/']);
      });
  }
}
