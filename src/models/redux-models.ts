export interface TodoModel {
    "userId": number,
    "id":number,
    "todo":string,
    "completed":boolean
}

export interface TodoArrayModel{
    all_todos:TodoModel[],
    particular_todo:TodoModel
}