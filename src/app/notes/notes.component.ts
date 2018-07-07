import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit, OnDestroy {
  notes;
  @Output() showDetails = new EventEmitter();
  private notesUpdate: Subscription;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getNotes()
    this.notesUpdate = this.api.usersUpdate.subscribe(
      () => this.getNotes()
    )
  }

  getNotes() {
    this.api.getNotes().subscribe(res => {
      this.notes = res;
    })
  }

  delNote(id) {
    this.api.delNote(id);
  }
  details(note) {
    this.showDetails.emit(note);
  }

  ngOnDestroy() {
    this.notesUpdate.unsubscribe()
  }

}
