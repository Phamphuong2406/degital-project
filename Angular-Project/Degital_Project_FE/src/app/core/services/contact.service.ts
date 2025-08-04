import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  ContactCreateModel,
  ContactModel,
  ContactUpdateModel,
  ReturnContactData,
} from '../models/contact.models';
import { PagedResult } from '../models/project.models';

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

    return this.http.get<PagedResult<ContactModel>>(
      `${this.baseUrl}/ContactRequestManagement/SearchByKey`,
      { params }
    );
  }

  getContactById(id: number): Observable<ContactModel> {
    return this.http.get<ContactModel>(
      `${this.baseUrl}/ProjectManagement/${id}`
    );
  }

  createNewContact(
    request: ContactCreateModel | FormData
  ): Observable<ReturnContactData> {
    return this.http.post<ReturnContactData>(
      `${this.baseUrl}/ProjectManagement`,
      request
    );
  }

  updateContact(
    request: ContactUpdateModel | FormData,
    projectId: number
  ): Observable<ReturnContactData> {
    return this.http.put<ReturnContactData>(
      `${this.baseUrl}/ProjectManagement/${projectId}`,
      request
    );
  }

  deleteContact(projectId: number): Observable<string> {
    return this.http.delete<string>(
      `${this.baseUrl}/ProjectManagement/${projectId}`,
      { responseType: 'text' as 'json' }
    );
  }
}
