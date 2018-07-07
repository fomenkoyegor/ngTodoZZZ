import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  users;
  @Output() clearDetails = new EventEmitter();
  private usersUpdate: Subscription;
  constructor(private api: ApiService) { }
  userId;
  ngOnInit() {
    this.getUsers();
    this.usersUpdate = this.api.usersUpdate.subscribe(
      () => this.getUsers()
    )

  }

  getUsers() {
    this.api.getUsers()
      .subscribe(res => this.users = res)
  }

  delUser(id) {
    this.api.delUser(id);
  }

  details(id) {
    this.api.updateNotes(id);
    this.clearDetails.emit(true);
    this.userId = id;
  }

  ngOnDestroy() {
    this.usersUpdate.unsubscribe()
  }
}
