import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppSate } from '../store';
import { CLEAR_TODO } from '../actions';

@Component({
  selector: 'app-todo-dashboard',
  templateUrl: './todo-dashboard.component.html',
  styleUrls: ['./todo-dashboard.component.css']
})
export class TodoDashboardComponent {

  @select() todos;
  @select() lastUpdate;
  
  constructor(private ngRedux: NgRedux<IAppSate>) {  }

  clearTodos(){
    this.ngRedux.dispatch({ type: CLEAR_TODO});
  }
}
