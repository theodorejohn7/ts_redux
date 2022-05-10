import Api from "./Api";
import { TodoModel } from "../models/redux-models";

export default {
  async getAllTodos() {
    var response = await Api().get("todos");
    console.log("response",response.data.todos);

    return response.data.todos;
  },

  async getParticularTodo(todo_id: number) {
    var response = await Api().get("todos");
    return response.data.todos.filter((todo: TodoModel) => todo.id === todo_id)[0];
  },
};
