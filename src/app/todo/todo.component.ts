import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../todo.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todo = {};
  showError;
  constructor(private route: ActivatedRoute, private _todoService: TodoService,
    private _router: Router) {
      this.showError = false;
     }

  ngOnInit() {
    this.route.paramMap
      .subscribe(params => {
        let id = +params.get('id');
        this._todoService.getTodo(id)
          .subscribe(
            res => this.todo = res,
            err => {
              if( err instanceof HttpErrorResponse ) {
                if (err.status === 401) {
                  this._router.navigate(['/login']);
                }
              }
              console.log(err);
            }
          );
      });
  }

  updateTodo() {
    this._todoService.update(this.todo)
      .subscribe(
        res => {
          this.showError = false;
          this._router.navigate(['/todos']);
        },
        err => {
          if( err instanceof HttpErrorResponse ) {
            if (err.status === 401) {
              this._router.navigate(['/login']);
            }
          }
          this.showError = true;
          console.log(err);
        });
  }
  dismiss(){
    this.showError = false;
    this._router.navigate(['/todos']);
  }

}
