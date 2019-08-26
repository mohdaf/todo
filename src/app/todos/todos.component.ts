import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { TodoService } from './../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos = [];
  constructor(private _todoService: TodoService,
    private _router: Router) { }

  ngOnInit() {
    this._todoService.getTodos()
      .subscribe(
        res => this.todos = res,
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/login']);
            }
          }
          console.log(err);
        }
      );
  }

  createTodo(input: HTMLInputElement) {
    let todo = { title: input.value };

    input.value = '';

    this._todoService.create(todo)
      .subscribe(
        newTodo => {
          todo['id'] = newTodo.id;
          this.todos.splice(0, 0, todo);
        },
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/login']);
            }
          }
          console.log(err);
        });
  }

  deleteTodo(todo) {
    this._todoService.delete(todo.id)
      .subscribe(
        res => {
          for(let i = 0; i < this.todos.length; i++) {
            if(this.todos[i].id == todo.id) {
                this.todos.splice(i, 1);
                break;
            }
        }
        },
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/login']);
            }
          }
          console.log(err);
        }
      );
  }

}
