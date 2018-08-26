import {Injectable} from '@angular/core';
import {HttpProvider} from '../providers/http.provider';
import {StoreProvider} from '../providers/store.provider';
import {ContactModel} from '../models/contact.model';
import {ContactsModel} from '../models/contacts.model';
import {Subject} from 'rxjs';

@Injectable()
export class ContactsInteractor {
  contacts: ContactModel[] = [];
  subject:Subject<any>;

  constructor(private http: HttpProvider,
              private store: StoreProvider){
    this.subject = new Subject();
  }

  getAllContacts():void{
    let  token = this.store.getToken();
    if(token!=null){
      this.http.getContacts(token)
        .subscribe((value: ContactsModel) => {
            this.contacts = value.contacts;
            this.subject.next();
          },
          err=>{
          console.log(err);
          this.contacts = [];
          });
    }
  }

  updateContact(contact: ContactModel):void{
    let token = this.store.getToken();
    if(token!=null){
      this.http.updateContact(token,contact)
        .subscribe(value => {
          if(value){
            this.getAllContacts();
          }
        },err=>{
          console.log(err);
          }
          );

    }
  }
}
