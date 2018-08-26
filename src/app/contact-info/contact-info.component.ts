import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContactsInteractor} from '../business/contacts.interactor';
import {ActivatedRoute, RouterLinkActive} from '@angular/router';
import {ContactModel} from '../models/contact.model';

@Component({
  selector: 'app-contact-info',
  templateUrl: './contact-info.component.html',
  styleUrls: ['./contact-info.component.css']
})
export class ContactInfoComponent implements OnInit, OnDestroy {
  current: ContactModel = null;
  subscriber;
  constructor(public interactor: ContactsInteractor,private router: ActivatedRoute) {

  }

  ngOnInit() {
    this.subscriber = this.interactor.subject.subscribe(value => {
      let id = this.router.snapshot.params['id'];
      this.current = this.interactor.contacts[id];
    });

    this.router.params.subscribe(value => {
      this.current = this.interactor.contacts[value['id']];
    });
  }

  changeContact() {
    this.current.fullName = 'New Name' + new Date().getTime();
    this.interactor.updateContact(this.current);
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }
}
