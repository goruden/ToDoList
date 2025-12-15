import { useState } from "react";
import { Edit } from "./";
import { TodoService } from '../lib/api'

interface ToDo {
  id?: string
  title: string
  description: string
  date: string
  status: 'remaining' | 'completed'
}

interface Props {
    item: ToDo;
    color: string;
    onOrderUpdated: () => void;
}


const DeleteModal = ({ deleteOrder, onClose }: { deleteOrder: () => void; onClose: () => void }) => {
    const handleDelete = () => {
        deleteOrder();
        onClose();
    };
    
    return (
    <div className="fixed top-0 left-0 bg-black/40 w-full h-full flex flex-col gap-5 items-center justify-center">
        <div className="bg-white p-5 rounded-lg flex flex-col gap-5 items-center justify-center">
            <p>Are you sure you want to delete this?</p>
            <div className="flex gap-10">
                <button className="bg-orange-300 text-orange-700 hover:bg-orange-400 px-4 py-2 rounded" onClick={handleDelete}>Yes</button>
                <button className="bg-green-300 text-green-700 hover:bg-green-400 px-4 py-2 rounded" onClick={onClose}>No</button>
            </div>
        </div>
    </div>    
    )
}

const TaskList = ({ item, color, onOrderUpdated }: Props) => {
    const [openEditModal, setOpenEditModal] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const handleOpenEdit = () => setOpenEditModal(!openEditModal)
    const handleOpenDelete = () => setOpenDeleteModal(!openDeleteModal)

    const toggleStatus = async () => {
        try {
            const newStatus = item.status === 'completed' ? 'remaining' : 'completed'
            await TodoService.update(item.id!, { status: newStatus })
            onOrderUpdated();
        } catch (error) {
            console.error('Error updating todo:', error);
            alert('Failed to update todo');
        }
    }

    const deleteOrder = async () => {
        try {
            await TodoService.delete(item.id!)
            onOrderUpdated();
        } catch (error) {
            console.error('Error deleting todo:', error);
            alert('Failed to delete todo');
        }
    }
    
    return (
        <div>
            {openEditModal && 
                <div className='w-full h-full fixed top-0 left-0 bg-black/40 flex' >
                    <div className="w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                        <Edit close={() => setOpenEditModal(false)} data={item} onOrderUpdated={onOrderUpdated} id={item.id!} />
                    </div>
                </div>
            }
            <div className="rounded-lg p-2 w-full flex gap-10 items-center">
                <div className="hover:bg-black/10 rounded-full cursor-pointer">
                    <svg onClick={toggleStatus} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-7">
                        <path fillRule="evenodd" color={color} d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                    </svg>
                </div>
                <div className="flex-1 flex">
                    <div onClick={handleOpenEdit} className={`flex-1 ${item.status === 'completed' ? "line-through text-neutral-500" : ""} cursor-pointer`}>
                        <p>{item.title}</p>
                        <p className="text-gray-500 text-xs">{item.description}</p>
                    </div>
                    <button onClick={handleOpenDelete} className="hover:bg-black/30 rounded-full p-2 cursor-pointer">
                        {openDeleteModal && <DeleteModal deleteOrder={deleteOrder} onClose={() => setOpenDeleteModal(false)} />}
                        <svg color="red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TaskList