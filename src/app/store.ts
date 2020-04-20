import { ADD_TODO, REMOVE_TODO, CLEAR_TODO, COMPLETE_TODO } from './actions';
import { tassign } from 'tassign';

export interface IAppSate {
    todos: any[],
    lastUpdate: Date
}

export const INITIAL_STATE: IAppSate = {
    lastUpdate: new Date(),
    todos: []
};

function addTodo(state, action) {
    let newTodo = { id: state.todos.length + 1, title: action.title };
    let newState = {
        todos: state.todos.concat(newTodo),
        lastUpdate: new Date()
    };
    return tassign(state, newState);
}
function completeTodo(state, action) {
    let st = state.todos;
    let item = st.find(t => { return t.id == action.id }); //Gets the item with specific Id
    let index = st.indexOf(item);

    let before = st.slice(0, index); //Returns the portion from 0 to index
    let after = st.slice(index + 1); //Returns the portion starting after index

    let updated = tassign(item, { isCompleted: !item.isCompleted }); //Add the property with the toggled state 'isCompleted'

    return tassign(state, {
        todos: [...before, updated, ...after],
        lastUpdate: new Date()
    });
}

function removeTodo(state, action) {
    return tassign(state, {
        todos: state.todos.filter(t => { return t.id != action.id }),
        lastUpdate: new Date()
    });
}

function clearTodo(state) {
    return tassign(state, {
        todos: [],
        lastUpdate: new Date()
    });
}

export function rootReducer(state: IAppSate, action) {
    switch (action.type) {
        case ADD_TODO: return addTodo(state, action);
        case COMPLETE_TODO: return completeTodo(state, action);
        case REMOVE_TODO: return removeTodo(state, action);
        case CLEAR_TODO: return clearTodo(state);
    }
    return state;
}