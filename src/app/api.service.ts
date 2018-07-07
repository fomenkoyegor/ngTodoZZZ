import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  readonly getAll = 'http://pdfstep.zzz.com.ua?action=user&method=getAll';
  readonly adduser = 'http://pdfstep.zzz.com.ua?action=user&method=add';
  readonly deluser = 'http://pdfstep.zzz.com.ua?action=user&method=del';
  readonly getnotes = 'http://pdfstep.zzz.com.ua?action=todo&method=get';
  readonly addnote = 'http://pdfstep.zzz.com.ua?action=todo&method=add';
  readonly delnote = 'http://pdfstep.zzz.com.ua?action=todo&method=delete';

  usersUpdate: Subject<any> = new Subject();
  userId;
  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.getAll)
      .pipe(map(
        res => res['data']
      ))
  }

  addUser(username) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('name', username);
    return this.http.post(
      this.adduser,
      body.toString(),
      { headers }
    ).subscribe(res => {
      this.usersUpdate.next()
    })

  }

  delUser(user_id) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('id', user_id);
    return this.http.post(
      this.deluser,
      body.toString(),
      { headers }
    ).subscribe(res => {
      this.usersUpdate.next()
    })

  }

  getNotes() {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('id', this.userId);
    return this.http.post(
      this.getnotes,
      body.toString(),
      { headers }
    ).pipe(map(
      res => res['data']
    ))
  }

  updateNotes(id) {
    this.userId = id;
    this.usersUpdate.next()
  }

  addNote(user_id, name, desc) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('id', user_id)
      .set('name', name)
      .set('desc', desc);
    return this.http.post(
      this.addnote,
      body.toString(),
      { headers }
    ).subscribe(res => {
      this.usersUpdate.next(this.updateNotes)
    })

  }

  delNote(note_id) {
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');
    const body = new HttpParams()
      .set('id', note_id);
    return this.http.post(
      this.delnote,
      body.toString(),
      { headers }
    ).subscribe(res => {
      this.usersUpdate.next(this.updateNotes)
    })

  }


}



