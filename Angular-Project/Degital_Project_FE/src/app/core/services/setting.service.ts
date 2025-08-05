import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import {
  ReturnSettingData,
  SettingCreateOrUpdateModel,
  SettingModel,
} from '../models/setting.model';
import { PagedResult } from './contact.service';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private baseUrl = 'https://localhost:7132/api';

  constructor(private http: HttpClient) {}
  //admin
  getListSetting(
    key?: string,
    pageNumber: number = 1,
    pageSize: number = 10
  ): Observable<PagedResult<SettingModel>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    if (key) {
      params = params.set('key', key);
    }

    return this.http.get<PagedResult<SettingModel>>(
      `${this.baseUrl}/SettingManagement/SearchByKey`,
      { params }
    );
  }

  getSettingById(id: number): Observable<SettingModel> {
    return this.http.get<SettingModel>(
      `${this.baseUrl}/SettingManagement/${id}`
    );
  }

  createNewSetting(
    request: SettingCreateOrUpdateModel
  ): Observable<ReturnSettingData> {
    return this.http.post<ReturnSettingData>(
      `${this.baseUrl}/SettingManagement`,
      request
    );
  }

  updateSetting(
    request: SettingCreateOrUpdateModel | FormData,
    settingId: number
  ): Observable<ReturnSettingData> {
    return this.http.put<ReturnSettingData>(
      `${this.baseUrl}/SettingManagement/${settingId}`,
      request
    );
  }

  deleteSetting(settingId: number): Observable<string> {
    return this.http.delete<string>(
      `${this.baseUrl}/SettingManagement/${settingId}`,
      { responseType: 'text' as 'json' }
    );
  }

  //client
  getFooterSettings(): Observable<SettingModel[]> {
    return this.http
      .get<SettingModel[]>(`${this.baseUrl}/Setting/GetListDisplayedOnFooter`)
      .pipe(
        catchError((err) => {
          console.warn('Lỗi khi lấy footer settings:', err);
          return of([]);
        })
      );
  }

  getAllSettings(): Observable<SettingModel[]> {
    return this.http
      .get<SettingModel[]>(`${this.baseUrl}/SettingManagement`)
      .pipe(
        catchError((err) => {
          console.warn('Lỗi khi lấy setting management:', err);
          return of([]);
        })
      );
  }

  getSettingValue(key: string): Observable<string | null> {
    return forkJoin({
      footer: this.getFooterSettings(),
      all: this.getAllSettings(),
    }).pipe(
      map(({ footer, all }) => {
        const fromFooter = footer.find(
          (s) => s.key.toLowerCase() === key.toLowerCase()
        );
        if (fromFooter) {
          return fromFooter.value;
        }
        const fromAll = all.find(
          (s) => s.key.toLowerCase() === key.toLowerCase()
        );
        return fromAll ? fromAll.value : null;
      })
    );
  }
}
