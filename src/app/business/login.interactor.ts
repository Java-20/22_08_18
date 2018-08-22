import {Injectable} from '@angular/core';
import {HttpProvider} from '../providers/http.provider';
import {StoreProvider} from '../providers/store.provider';
import {Observable} from 'rxjs';
import {AuthModel} from '../models/auth.model';
import {map} from 'rxjs/operators';

@Injectable()
export class LoginInteractor {
  constructor(
    private http: HttpProvider,
    private store: StoreProvider
  ){}

  registration(email:string, password:string):Observable<boolean>{
    let auth = new AuthModel(email,password);
    return this.http.registration(auth)
      .pipe(
      map(v=>{
        this.store.saveToken(v.token);
        return true;
      })
    );
  }
}
