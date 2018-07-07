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
  noteId;
  @Output() showDetails = new EventEmitter();
  @Output() clearDetails = new EventEmitter();
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
    this.clearDetails.emit(true);
  }
  details(note) {
    this.showDetails.emit(note);
    this.noteId = note.id;
  }

  ngOnDestroy() {
    this.notesUpdate.unsubscribe()
  }

}
