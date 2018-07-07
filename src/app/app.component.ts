import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  note;
  showDetails(note){
    this.note = note;
  }

  clearDetails(){
    this.note = '';
  }
}
