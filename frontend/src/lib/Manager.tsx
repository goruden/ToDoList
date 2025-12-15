import { useState, useEffect } from 'react'
import { TaskList, Add } from "@/components"
import { TodoService } from './api'

interface ToDo {
  id?: string
  title: string
  description: string
  date: string
  status: 'remaining' | 'completed'
}

const Manager = () => {
  const [filter, setFilter] = useState('all')
  const [todo, setTodo] = useState<ToDo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const data = await TodoService.getAll()
      setTodo(data)
    } catch (error) {
      console.error('Failed to fetch todos:', error)
      setTodo([])
    } finally {
      setLoading(false)
    }
  }

  const buttonClickHandler = (filterType: string) => {
    setFilter(filterType)
  }

  const [openModal, setOpenModal] = useState(false)
  const handleOpen = () => setOpenModal(!openModal)

  const [query, setQuery] = useState('')
  const filteredItems = todo.filter(listData => `${listData.title} ${listData.description}`.toLowerCase().includes(query.toLowerCase()))
  // const [activeSearch, setActiveSearch] = useState([])
  // const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.value == ''){
  //     setActiveSearch([])
  //     return false
  //   }
  //   setActiveSearch(words.filter(w => w.includes(e.target.value)).slice(0,8))
  // };

  return (
    <div className="w-full h-full justify-items-center">
      {openModal &&
        <div className='w-full h-full fixed top-0 bg-black/40 flex items-center justify-center'>
          <Add close={() => setOpenModal(false)} onOrderCreated={fetchOrders} />
        </div>
      }

      <div className="bg-white w-1/2 shadow-lg rounded-lg p-10 m-5 justify-items-center space-y-5">
        <div className="flex justify-between w-full">
          <p className="text-2xl font-bold">Title</p>
          <div className="flex gap-5">
            <button className="">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
                <path fillRule="evenodd" d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z" clipRule="evenodd" />
              </svg>
            </button>
            <button onClick={handleOpen} className="rounded-lg cursor-pointer hover:bg-sky-200 flex items-center bg-sky-100 text-sky-700 p-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
              </svg>
              Add
            </button>
          </div>
        </div>
        <hr className="w-full" />
        <div className='flex justify-between w-full bg-neutral-200 rounded-full p-2 items-center'>
          <div className="text-lg font-semibold w-full mx-10">
            <input
              type='search'
              className="w-full"
              placeholder="Search..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {/* <button className='p-2 bg-sky-100 rounded-full cursor-pointer'>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fill-rule="evenodd" d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z" clip-rule="evenodd" />
                  </svg>
                </button> */}
        </div>
        <div className='flex gap-5'>
          <button
            onClick={() => {
              buttonClickHandler("all")
            }}
            className={`cursor-pointer rounded-lg p-2 flex gap-1 items-center
              ${filter === 'all' ? 'bg-blue-300' : 'bg-neutral-200 hover:bg-blue-200'}
            `}
          >
            <div className='bg-blue-200 text-blue-700 rounded-l px-2 py-1'>
              {todo.length}
            </div>
            <p className="font-medium px-1">
              All
            </p>
          </button>
          <button
            onClick={() => {
              buttonClickHandler("remaining")
            }}
            className={`cursor-pointer rounded-lg p-2 flex gap-1 items-center
              ${filter === 'remaining' ? 'bg-red-300' : 'bg-neutral-200 hover:bg-red-200'}
            `}
          >
            <div className='bg-red-200 text-red-700 rounded-l px-2 py-1'>
              {todo.filter(item => item.status === 'remaining').length}
            </div>
            <p className="font-medium px-1">
              Remaining
            </p>
          </button>
          <button
            onClick={() => {
              buttonClickHandler("completed")
            }}
            className={`cursor-pointer rounded-lg p-2 flex gap-1 items-center
            ${filter === 'completed' ? 'bg-green-300' : 'bg-neutral-200 hover:bg-green-200'}
          `}
          >
            <div className='bg-green-200 text-green-700 rounded-l px-2 py-1'>
              {todo.filter(item => item.status === 'completed').length}
            </div>
            <p className="font-medium px-1">
              Completed
            </p>
          </button>
        </div>
        <div className="w-full">
          {loading ? (
            <p className='text-center text-2xl font-bold my-20'>Loading...</p>
          ) : filteredItems.length === 0 ? (
            <p className='text-center text-2xl font-bold my-20'>No items found</p>
          ) : (
            filteredItems.sort((b, a) => a.status.localeCompare(b.status)).map((item) => {
              if (filter === 'all' || item.status === filter) {
                return (
                  <div key={item.id}>
                    <TaskList
                      item={item}
                      onOrderUpdated={fetchOrders}
                      color={item.status === 'completed' ? 'green' : '#808080'}
                    />
                  </div>
                )
              }
              return null
            }
            ))}
        </div>
      </div>
    </div>
  )
}

export default Manager