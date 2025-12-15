import { useState } from "react";
import { TodoService } from '../lib/api'

interface ToDo {
  id?: string
  title: string
  description: string
  date: string
  status: 'remaining' | 'completed'
}

interface Props {
    close: () => void;
    data: ToDo;
    onOrderUpdated: () => void;
    id: string;
}

function GetFormattedDate(date: string) {
    const dateObj = new Date(date);
    var month = ("0" + (dateObj.getMonth() + 1)).slice(-2);
    var day  = ("0" + (dateObj.getDate())).slice(-2);
    var year = dateObj.getFullYear();
    var hour =  ("0" + (dateObj.getHours())).slice(-2);
    var min =  ("0" + (dateObj.getMinutes())).slice(-2);
    return year + "-" + month + "-" + day + " " + hour + ":" + min;
}

const Edit = ({ close, data, onOrderUpdated, id }: Props) => {
    const date = GetFormattedDate(data.date)
    const [editData, setEditData] = useState(data);

    const handleSave = async () => {
        try {
            await TodoService.update(id, { 
                title: editData.title,
                description: editData.description,
                status: editData.status 
            });
            onOrderUpdated();
            close();
        } catch (error) {
            console.error('Error updating todo:', error);
            alert('Failed to update todo');
        }
    }
    return (
        <div className="rounded-lg p-5 w-1/3 bg-white">
            <div className="flex justify-between items-center mb-4">
                <p className="text-2xl font-semibold">Edit Item</p>
                <svg onClick={close} cursor="pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                    <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                </svg>
            </div>
            <div className="flex flex-col gap-3">
                <input 
                    type="text" 
                    className="w-full rounded bg-neutral-200 p-2 px-4" 
                    placeholder="Title" 
                    value={editData.title}
                    onChange={(e) => setEditData({...editData, title: e.target.value})}
                />
                <textarea 
                    className="w-full rounded bg-neutral-200 p-2 px-4" 
                    placeholder="Description"
                    value={editData.description}
                    onChange={(e) => setEditData({...editData, description: e.target.value})}
                />
                <input 
                    disabled 
                    type="text" 
                    className="w-full cursor-not-allowed rounded bg-neutral-200 p-2 px-4 brightness-80" 
                    placeholder="Date"
                    value={date}
                />
                <div className="flex brightness-80">
                    <input 
                        disabled 
                        type="text" 
                        className="w-full cursor-not-allowed rounded bg-neutral-200 p-2 px-4" 
                        placeholder="Status"
                        value={editData.status}
                    />
                    <button className="mx-3" onClick={() => setEditData({...editData, status: editData.status === 'completed' ? 'remaining' : 'completed'})}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                        </svg>
                    </button>
                </div>
            </div>
            <button onClick={handleSave} className="mt-4 w-full bg-green-300 text-green-700 px-4 py-2 rounded hover:bg-green-400">
                Save
            </button>
        </div>
    )
}

export default Edit