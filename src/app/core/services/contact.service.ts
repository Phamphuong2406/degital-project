import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  ContactCreateModel,
  ContactModel,
  ContactUpdateModel,
} from '../models/contact.models';

export interface PagedResult<T> {
  data: T[];
  totalCount: number;
}

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private baseUrl = 'https://localhost:7132/api';

  constructor(private http: HttpClient) {}

  getListContact(
    key?: string,
    status?: string,
    requestDate?: string,
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<PagedResult<ContactModel>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (key) {
      params = params.set('key', key);
    }
    if (status) {
      params = params.set('status', status);
    }
    if (requestDate) {
      params = params.set('requestDate', requestDate);
    }

    return this.http
      .get<PagedResult<ContactModel>>(
        `${this.baseUrl}/ContactRequestManagement/SearchByKey`,
        { params }
      )
      .pipe(
        catchError((err) => {
          console.error('Lỗi khi lấy danh sách contact:', err);
          return of({ data: [], totalCount: 0 });
        })
      );
  }

  createContactRequest(
    request: ContactCreateModel
  ): Observable<{ message: string; result: boolean }> {
    return this.http
      .post<{ message: string; result: boolean }>(
        `${this.baseUrl}/ContactRequestManagement`,
        request
      )
      .pipe(
        catchError((err) => {
          console.error('Lỗi khi tạo contact request:', err);
          return of({
             message: 'Gui thanh cong', result: false
            });
        })
      );
  }

  updateContactRequest(
    request: ContactUpdateModel,
    id: number
  ): Observable<{ message: string; result: boolean }> {
    return this.http
      .put<{ message: string; result: boolean }>(
        `${this.baseUrl}/ContactRequestManagement/${id}`,
        request
      )
      .pipe(
        catchError((err) => {
          console.error('Lỗi khi cập nhật contact request:', err);
          return of({ message: 'Cập nhật thất bại', result: false });
        })
      );
  }

  deleteContact(id: number): Observable<string> {
    return this.http
      .delete<string>(`${this.baseUrl}/ContactRequestManagement/${id}`, {
        responseType: 'text' as 'json',
      })
      .pipe(
        catchError((err) => {
          console.error('Lỗi khi xóa contact:', err);
          return of('Xóa thất bại');
        })
      );
  }

  getContactById(id: number): Observable<ContactModel> {
    return this.http.get<ContactModel>(
      `${this.baseUrl}/ContactRequestManagement/${id}`
    );
  }
}
