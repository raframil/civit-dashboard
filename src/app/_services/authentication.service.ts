import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { BehaviorSubject, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { UserModel } from '../_models/user'
import { environment } from 'src/environments/environment'

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserModel>
  public currentUser: Observable<UserModel>

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')))
    this.currentUser = this.currentUserSubject.asObservable()
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value
  }

  login(email: string, password: string) {
    return this.http
      .post<any>(`${environment.api}/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((user) => {
          console.log(user)

          localStorage.setItem('currentUser', JSON.stringify(user))
          this.currentUserSubject.next(user)
          return user
        })
      )
  }

  logout() {
    localStorage.removeItem('currentUser')
    this.currentUserSubject.next(null)
  }
}
