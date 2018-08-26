import { Component, OnInit } from '@angular/core';
import {ContactsInteractor} from '../business/contacts.interactor';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  providers:[ContactsInteractor]
})
export class ContactsComponent implements OnInit {

  constructor(public interactor: ContactsInteractor) { }

  ngOnInit() {
    this.interactor.getAllContacts();
  }

}
