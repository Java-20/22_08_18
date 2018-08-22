import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {AuthModel} from '../models/auth.model';
import {Observable, throwError} from 'rxjs';
import {TokenModel} from '../models/token.model';
import {catchError} from 'rxjs/operators';

@Injectable()
export class HttpProvider {
  private BASE_URL: string = 'https://telranstudentsproject.appspot.com/_ah/api/contactsApi/v1';

  constructor(private http: HttpClient){}

  registration(auth: AuthModel):Observable<TokenModel>{
    return this.http.post<TokenModel>(this.BASE_URL+'/registration',auth)
      .pipe(catchError((err:HttpErrorResponse) => {
        if(err.status === 409){
          return throwError(new Error('User already exist!'));
        }else{
          console.log(err);
          return throwError(new Error('Server error! Call to support'));
        }
      }));
  }
}
