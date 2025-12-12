 import { makeAutoObservable } from "mobx";

class TodoStore {
  todos = [];

  constructor() {
    makeAutoObservable(this);
    this.todos = [
      { id: 1, title: "salom ", Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYeXoPJvCJcPL4MhitJzrSvJUSVxz5femYtw&s", status: false },
      { id: 2, title: "shumo ",Image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUcAWcI9SnKzeQ2g4J698TPfGk3LTghm9iPw&s", status: false },
      { id: 3, title: "soz",Image: "https://www.hollywoodreporter.com/wp-content/uploads/2012/12/img_logo_blue.jpg?w=1440&h=810&crop=1", status: false },
    ];
  }

  addTodo(title) {
    this.todos.push({ id: Date.now(), title, status: false });
  }

  deleteTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  editTodo(id, newTitle) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) todo.title = newTitle;
  }

  toggleStatus(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) todo.status = !todo.status;
  }
}

export const todoStore = new TodoStore();
