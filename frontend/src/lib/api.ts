interface ToDo {
  id?: string
  title: string
  description: string
  date: string
  status: 'remaining' | 'completed'
}

const API_BASE = 'http://localhost:5000/api/todos'

export class TodoService {
  static async getAll(): Promise<ToDo[]> {
    try {
      const response = await fetch(`${API_BASE}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      return Array.isArray(data) ? data : []
    } catch (error) {
      console.error('Failed to fetch todos:', error)
      throw error
    }
  }

  static async create(todo: Omit<ToDo, 'id'>): Promise<ToDo> {
    try {
      const response = await fetch(`${API_BASE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Failed to create todo:', error)
      throw error
    }
  }

  static async update(id: string, todo: Partial<ToDo>): Promise<ToDo> {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('Failed to update todo:', error)
      throw error
    }
  }

  static async delete(id: string): Promise<void> {
    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
    } catch (error) {
      console.error('Failed to delete todo:', error)
      throw error
    }
  }
}
