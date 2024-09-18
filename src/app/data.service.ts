import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface IData {
  PATH_ID: string;
  PATH: string;
  Path_ID_for_Vlookup: string;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private httpClient = inject(HttpClient);

  all(): Observable<IData[]> {
    return this.httpClient.get<IData[]>('/data.json');
  }
}
