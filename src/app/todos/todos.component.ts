import { TodoService } from './../todo.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {

  todos = [{'title':'let us try'}];
  constructor(private _todoService: TodoService) { }

  ngOnInit() {
    this._todoService.getTodos()
      .subscribe(
        res => this.todos = res,
        err => console.log(err)
      )
  }

}
