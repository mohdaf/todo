import { TodoService } from './../todo.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos = [{'title':'No items available!'}];
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
      )
  }

}
