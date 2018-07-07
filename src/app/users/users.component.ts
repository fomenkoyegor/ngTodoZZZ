import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from '../api.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {
  users;
  private usersUpdate: Subscription;
  constructor(private api: ApiService) { }

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
    this.api.updateNotes(id)
  }

  ngOnDestroy() {
    this.usersUpdate.unsubscribe()
  }
}
