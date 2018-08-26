import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {AuthModel} from '../models/auth.model';
import {Observable, of, throwError} from 'rxjs';
import {TokenModel} from '../models/token.model';
import {catchError, map} from 'rxjs/operators';
import {ContactsModel} from '../models/contacts.model';
import {ContactModel} from '../models/contact.model';

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

  login(auth: AuthModel):Observable<TokenModel>{
    return this.http.post<TokenModel>(this.BASE_URL+'/login',auth)
      .pipe(catchError((err:HttpErrorResponse) => {
        if(err.status === 401){
          return throwError(new Error('Wrong email or password'));
        }else{
          console.log(err);
          return throwError(new Error('Server error! Call to support'));
        }
      }));
  }

  getContacts(token: string): Observable<ContactsModel>{
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization':token
    })

    return this.http.get<ContactsModel>(this.BASE_URL+'/contactsarray',{
      headers:headers
    }).pipe(catchError((err:HttpErrorResponse)=>{
        if(err.status === 401){
          return throwError((new Error('Wrong authorization')))
        }else{
          console.log(err);
          return throwError(new Error('Server error! Call to support'));
        }
      }
    ));
  }


  updateContact(token: string, contact:ContactModel): Observable<boolean>{
    let headers: HttpHeaders = new HttpHeaders({
      'Authorization':token
    });

    return this.http.post(this.BASE_URL+'/setContact',contact,{
      headers:headers
    }).pipe(catchError(err => {
      console.log(err);
      return throwError(new Error('Server error'))
    }),map(value => {
      return true;
    }));
  }


}
