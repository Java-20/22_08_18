import {Component, OnInit} from '@angular/core';
import {LoginInteractor} from '../business/login.interactor';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginInteractor]
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private interactor: LoginInteractor) {
  }

  ngOnInit() {
  }

  registration() {
    this.interactor.registration(this.email, this.password)
      .subscribe(v => {
          if (v) {
            console.log('Registration success');
          } else {
            console.log('Something went wrong');
          }
        }, err => {
          console.log('Error:' + err);
        },
        () => {
          this.email = '';
          this.password = '';
        });
  }
}
