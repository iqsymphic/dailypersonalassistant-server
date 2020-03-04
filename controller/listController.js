const ToDoList = require("../model/listModel");

const controller = {};

controller.index = (req, res) => {
  ToDoList.findAll()
    .then(todolist => {
      res.json({
        data: { todolist }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({ message: "400", err });
    });
};

controller.create = (req, res) => {
  ToDoList.findLength().then(length => {
    ToDoList.create({
      content: req.body.content,
      position: Number(length[0].count) + 1
    })
      .then(ToDoList => {
        res.json({ message: "ok", data: { todolist } });
      })
      .catch(err => {
        console.log(err);
        res.status(400).json({ message: "400", err });
      });
  });
};

controller.show = (req, res) => {
  ToDoList.findById(req.params.id)
    .then(todolist => {
      res.json({
        message: "okay",
        data: { todolist }
      });
    })
    .catch(err => {
      res.status(400).json({ message: "400", err });
    });
};

controller.update = (req, res) => {
  ToDoList.update(
    {
      content: req.body.content,
      checked: req.body.checked
    },
    req.params.id
  )
    .then(todolist => {
      res.json({
        message: "okay",
        data: { todolist }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
};

controller.updateOrder = (req, res) => {
  let itemsId = req.body.itemsId;
  for (let i = 0; i < itemsId.length; i++) {
    ToDoList.updateOrder({
      index: i,
      id: itemsId[i]
    });
  }
};

controller.destroy = (req, res) => {
  ToDoList.destroy(req.params.id)
    .then(() => {
      res.json({ message: "Deleted" });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
};

module.exports = controller;
