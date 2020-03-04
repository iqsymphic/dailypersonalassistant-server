const database = require("../database/config");

const ToDoList = {};

ToDoList.findAll = () => {
  return database.query("SELECT * FROM thingstodo ORDER BY position DESC");
};

ToDoLists.findById = id => {
  return database.oneOrNone(`SELECT * FROM thingstodo WHERE id = $1`, [id]);
};

ToDoList.create = todolist => {
  return database.one(
    `insert into thingstodo (content, checked, position)
        values ($1, $2, $3) returning *`,
    [todolist.content, "false", todolist.position]
  );
};

ToDoList.findLength = () => {
  return database.query("SELECT COUNT(id) FROM thingstodo");
};

ToDoList.update = (todolist, id) => {
  return database.none(
    `
        update thingstodo set
        content = $1,
        checked = $2,
        where id = $3,
        RETURNING *
        `,
    [todolist.content, todolist.checked, id]
  );
};

ToDoList.updateOrder = todolist => {
  return database.none(
    `update thingstodo set
    position = $1,
    where id = $2`,
    [todolist.index, todolist.id]
  );
};

ToDoList.destroy = id => {
  return database.none(
    `
        delete from thingstodo
        where id = $1`,
    [id]
  );
};

module.exports = ToDoList;
