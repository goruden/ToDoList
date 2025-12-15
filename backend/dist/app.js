"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
let todos = [];
app.get('/todos', (req, res) => {
    res.send('todos');
});
app.post('/todos', (req, res) => {
    const newTodo = {
        id: Date.now().toString(),
        title: req.body.title,
        description: req.body.description || '',
        date: new Date().toISOString(),
        status: 'remaining'
    };
    todos.push(newTodo);
    res.status(201).send(newTodo);
});
app.delete('/todos/:id', (req, res) => {
    const todoId = req.params.id;
    todos = todos.filter(todo => todo.id !== todoId);
    res.status(204).send();
});
app.put('/todos/:id', (req, res) => {
    const id = req.params.id;
    const order = todos.find(o => o.id === id);
    if (!order) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    const { title, description, status } = req.body;
    if (title)
        order.title = title;
    if (description !== undefined)
        order.description = description;
    if (status && (status === 'remaining' || status === 'completed')) {
        order.status = status;
    }
    res.json(order);
});
exports.default = app;
