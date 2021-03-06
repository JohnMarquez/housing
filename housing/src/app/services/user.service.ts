import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { AccountService } from './account.service';
import { OktaAuthService } from '@okta/okta-angular';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private account: AccountService, private auth: OktaAuthService) {
    let decodedToken: string;
    this.UserId$.subscribe(currentUserId => {
      if (currentUserId === '') {
        account.getId$().subscribe(res => {
          this.userId.next(res);
        });
      }
      auth.getAccessToken().then((res) => {
        const roleString = 'role';
        const emailString = 'sub';

        // atob decodes a Base64-encoded string
        decodedToken = atob(res.split('.')[1]);
        this.roles.next(JSON.parse(decodedToken)[roleString]);
        this.email.next(JSON.parse(decodedToken)[emailString]);
      });

    });
  }

  private userId: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly UserId$: Observable<string> = this.userId.asObservable();

  private roles: BehaviorSubject<string[]> = new BehaviorSubject([]);
  public readonly Roles$: Observable<string[]> = this.roles.asObservable();

  private email: BehaviorSubject<string> = new BehaviorSubject('');
  public readonly Email$: Observable<string> = this.email.asObservable();

}
