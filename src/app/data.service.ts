import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  currentUser: any;
  loginStatus = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  logOut() {
    this.currentUser = {};
    this.loginStatus.next(false);
  }

  checkUser(data) {
    return this.http.post('api/checkUser', { 'user' : data }).pipe(
      map((res) => {
        if(res['user']=='') {
          this.loginStatus.next(false);
          return false;
        }
        this.loginStatus.next(true);
        this.currentUser = res['user'];
        return true;
      })
    );
  }

  addUser(data) {
    return this.http.post('api/addUser', { 'user' : data }).pipe(
      map((res) => {
        if(res['user']=='') {
          this.loginStatus.next(false);
          return false;
        }
        this.loginStatus.next(true);
        this.currentUser = res['user'];
        return true;
      })
    );
  }

  updateUser(data) {
    return this.http.post('api/updateUser', { 'user' : data }).pipe(
      map((res) => {
        return res;
      })
    );
  }

  sendEmotionFrame(image) {
    return this.http.post('api/emotionImage', { 'image' : image }).pipe(
      map((res) => {
        return res
      })
    );
  }

  sendFrontFrame(images) {
    return this.http.post('api/frontImage', { 'images' : images }).pipe(
      map((res) => {
        return res
      })
    );
  }

  sendRearFrame(image) {
    return this.http.post('api/rearImage', { 'image' : image }).pipe(
      map((res) => {
        if (res['message']=='1') {
          return true
        }
        return false
      })
    );
  }
}
