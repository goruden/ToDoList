
import express from 'express'
import { ToDo } from './types/todo'

const app = express()

let todos: ToDo[] = []

app.get('/todos', (req, res) => {
    res.send('todos')
})

app.post('/todos', (req, res) => {
    const newTodo: ToDo = {
        id: Date.now().toString(),
        title: req.body.title,
        description: req.body.description || '',
        date: new Date().toISOString(),
        status: 'remaining'
    }

    todos.push(newTodo)
    res.status(201).send(newTodo)
})

app.delete('/todos/:id', (req, res) => {
    const todoId = req.params.id
    todos = todos.filter(todo => todo.id !== todoId)
    res.status(204).send()
})

app.put('/todos/:id', (req, res) => {
  const id = req.params.id
  const order = todos.find(o => o.id === id)
  
  if (!order) {
    return res.status(404).json({ error: 'Todo not found' })
  }
  
  const { title, description, status } = req.body
  
  if (title) order.title = title
  if (description !== undefined) order.description = description
  if (status && (status === 'remaining' || status === 'completed')) {
    order.status = status
  }
  
  res.json(order)
})

export default app