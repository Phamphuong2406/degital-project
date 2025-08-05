import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Setting } from '../models/setting.model';

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private baseUrl = 'https://localhost:7132/api';

  constructor(private http: HttpClient) {}


  getFooterSettings(): Observable<Setting[]> {
    return this.http.get<Setting[]>(`${this.baseUrl}/Setting/GetListDisplayedOnFooter`).pipe(
      catchError(err => {
        console.warn('Lỗi khi lấy footer settings:', err);
        return of([]);
      })
    );
  }


  getAllSettings(): Observable<Setting[]> {
    return this.http.get<Setting[]>(`${this.baseUrl}/SettingManagement`).pipe(
      catchError(err => {
        console.warn('Lỗi khi lấy setting management:', err);
        return of([]);
      })
    );
  }


  getSettingValue(key: string): Observable<string | null> {
    return forkJoin({
      footer: this.getFooterSettings(),
      all: this.getAllSettings()
    }).pipe(
      map(({ footer, all }) => {
        const fromFooter = footer.find(s => s.key.toLowerCase() === key.toLowerCase());
        if (fromFooter) {
          return fromFooter.value;
        }
        const fromAll = all.find(s => s.key.toLowerCase() === key.toLowerCase());
        return fromAll ? fromAll.value : null;
      })
    );
  }
}
