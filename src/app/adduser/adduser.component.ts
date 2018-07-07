import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  name = '';
  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  addUser() {
    if (!this.name) {
      return
    }
    this.api.addUser(this.name);
    this.name = "";
  }

}
