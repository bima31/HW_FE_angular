import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

type Items = {
  id: number, nama_product: string, qty_product: number
}
@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loginUrl = 'http://localhost:8080/api/auth/signin'; // Replace with your API endpoint
  private dataUrl = 'http://localhost:8080/api/product'; //
  private hapusData = 'http://localhost:8080/api/product/hapus'; //
  private editData = 'http://localhost:8080/api/product/edit'; //
  private inputData = 'http://localhost:8080/api/product/input'; //

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username, password })
      .pipe(
        tap(response => {
          try {
            localStorage.setItem('token', response.accessToken);
          } catch (error) {
            console.error(error); //raises the error
          }
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getData(): Observable<{message: string, data: []}> {
    return this.http.get<{message: string, data: []}>(this.dataUrl);
  }
  deleteItem(id: number): Observable<any> {
    return this.http.post<any>(this.hapusData, { id })
  }
  updateItem(item:Items): Observable<any> {
    return this.http.post<any>(this.editData, item)
  }
  inputItem(item:Items): Observable<any> {
    return this.http.post<any>(this.inputData, item)
  }
}
