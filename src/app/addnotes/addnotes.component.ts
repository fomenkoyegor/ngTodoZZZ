
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-addnotes',
  templateUrl: './addnotes.component.html',
  styleUrls: ['./addnotes.component.css']
})
export class AddnotesComponent implements OnInit, OnDestroy {
  userId;
  name = '';
  desc = '';
  private notesUpdate: Subscription;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getUserId()
    this.notesUpdate = this.api.usersUpdate.subscribe(
      () => this.getUserId()
    )
  }

  getUserId() {
    this.userId = this.api.userId;
    // console.log(this.userId)
  }

  addNote() {
    if (!this.name || !this.desc || !this.userId) return
    this.api.addNote(this.userId, this.name, this.desc);
    this.name = '';
    this.desc = '';
  }

  ngOnDestroy() {
    this.notesUpdate.unsubscribe()
  }

}
