import { createClient } from '@supabase/supabase-js'
import { Request, Response } from 'express'
import { ToDo } from '../types/todo'

let supabase: any = null

const initializeSupabase = () => {
  if (!supabase) {
    const supabaseUrl = process.env.SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_KEY

    if (!supabaseUrl || !supabaseKey) {
      throw new Error('SUPABASE_URL and SUPABASE_KEY must be defined in environment variables')
    }

    supabase = createClient(supabaseUrl, supabaseKey)
  }
  return supabase;
}

export const getTodos = async (req: Request, res: Response) => {
  const client = initializeSupabase()
  const { data, error } = await client.from('todos').select('*').order('date', { ascending: true })
  if (error) return res.status(500).json({ error: error.message })
  res.json(data)
}

export const addTodo = async (req: Request, res: Response) => {
  const client = initializeSupabase()
  const todo: ToDo = req.body
  const { data, error } = await client.from('todos').insert([todo]).select()
  if (error) return res.status(500).json({ error: error.message })
  res.status(201).json(data[0])
}

export const updateTodo = async (req: Request, res: Response) => {
  const client = initializeSupabase()
  const { id } = req.params
  const todo: Partial<ToDo> = req.body
  const { data, error } = await client.from('todos').update(todo).eq('id', id).select()
  if (error) return res.status(500).json({ error: error.message })
  res.json(data[0])
}

export const deleteTodo = async (req: Request, res: Response) => {
  const client = initializeSupabase()
  const { id } = req.params
  const { error } = await client.from('todos').delete().eq('id', id)
  if (error) return res.status(500).json({ error: error.message })
  res.json({ message: 'Todo deleted successfully' })
}
