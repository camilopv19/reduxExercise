import { Component, OnInit } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppSate } from '../store';
import { ADD_TODO, COMPLETE_TODO, CLEAR_TODO, REMOVE_TODO } from '../actions';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
  @select() todos;
  @select() lastUpdate;

  constructor(private ngRedux: NgRedux<IAppSate>) {  }

  addTodo(item){
    if (!item.value) return;

    this.ngRedux.dispatch({type: ADD_TODO, title: item.value});
    
    item.value = '';
  }
  toggleTodo(item){
    this.ngRedux.dispatch({type: COMPLETE_TODO, id: item.id});
  }
  removeTodo(item){
    this.ngRedux.dispatch({type: REMOVE_TODO, id: item.id});
  }
}
