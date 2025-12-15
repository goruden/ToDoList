export interface ToDo {
  id?: string // optional when creating
  title: string
  description: string
  date: string // ISO string
  status: 'remaining' | 'completed'
}
