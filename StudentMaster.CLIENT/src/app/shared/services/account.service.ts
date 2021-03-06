import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API } from '@shared/config';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(private http: HttpClient) {}

  changeAvatar(base64: string) {
    return this.http.post<string>(API + '/api/Account/change-avatar-image', { base64 });
  }
  resetPasswordRequest(data: string) {
    return this.http.get<string>(API + '/api/Account/reset-password-request/' + data);
  }
  useConfirmCodeWithEmail(email: string, code: string) {
    return this.http.get<string>(API + '/api/Account/check-confirm-code/' + email + '/' + code);
  }
  chengePasswordWithoutPassword(email, code, password) {
    return this.http.get<string>(
      API + '/api/Account/change-password-without-password/' + email + '/' + code + '/' + password
    );
  }
  changePassword(currentPassword: string, newPassword: string) {
    return this.http.get(`${API}/api/Account/change-password/${currentPassword}/${newPassword}`);
  }
  createAccount(username, firstname, name, lastname, password, code) {
    return this.http.post(API + '/api/Account/create-account', {
      username,
      firstname,
      name,
      lastname,
      password,
      code,
    });
  }
}
