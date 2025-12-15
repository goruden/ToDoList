import { supabase } from '../lib/supabase'

export interface ToDo {
  id?: string
  title: string
  description: string
  date: string
  status: 'remaining' | 'completed'
}

export const TodoService = {
  async getAll(): Promise<ToDo[]> {
    console.log('Fetching todos from Supabase...')
    
    // Try simpler query first without ordering
    const { data, error } = await supabase
      .from('todos')
      .select('*')

    console.log('Supabase response:', { data, error })

    if (error) {
      console.error('Error fetching todos:', error.message, error.details, error.hint)
      
      // If ordering is the issue, try without it
      console.log('Trying without ordering...')
      const { data: data2, error: error2 } = await supabase
        .from('todos')
        .select('*')
        
      if (error2) {
        console.error('Still error without ordering:', error2.message)
        throw error2
      }
      
      return data2 ?? []
    }

    console.log('Returning todos:', data ?? [])
    return data ?? []
  },

  async create(todo: Omit<ToDo, 'id'>) {
    console.log('Creating todo:', todo)
    const { data, error } = await supabase
      .from('todos')
      .insert(todo)
      .select()

    console.log('Create response:', { data, error })

    if (error) {
      console.error('Error creating todo:', error)
      throw error
    }
  },

  async update(id: string, updates: Partial<ToDo>) {
    const { error } = await supabase
      .from('todos')
      .update(updates)
      .eq('id', id)

    if (error) {
      console.error(error)
      throw error
    }
  },

  async delete(id: string) {
    const { error } = await supabase
      .from('todos')
      .delete()
      .eq('id', id)

    if (error) {
      console.error(error)
      throw error
    }
  }
}
