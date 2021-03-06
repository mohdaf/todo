import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _todosUrl = "https://todo-backend.modaf.xyz/api/todo/todo/";

  constructor(private http: HttpClient) { }

  getTodos() {
    return this.http.get<any>(this._todosUrl);
  }

  getTodo(todo_id) {
    return this.http.get<any>(this._todosUrl + todo_id + '/');
  }

  create(todo) {
    return this.http.post<any>(this._todosUrl, todo);
  }

  update(todo) {
    return this.http.patch<any>(this._todosUrl + todo.id + '/' ,todo);
  }

  delete(todo_id) {
    return this.http.delete<any>(this._todosUrl + todo_id + '/');
  }

}
