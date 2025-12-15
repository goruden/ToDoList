import { TodoService } from '../lib/api'

interface Props {
    close: () => void;
    onOrderCreated: () => void;
}

const Add = ({ close, onOrderCreated }: Props) => {
    const handleSubmit = async () => {
        const title = (document.querySelector('input[type="title"]') as HTMLInputElement)?.value || '';
        const description = (document.querySelector('textarea') as HTMLTextAreaElement)?.value || '';

        if (!title.trim()) {
            alert('Please enter a title');
            return;
        }

        try {
            await TodoService.create({
                title, 
                description,
                date: new Date().toISOString(),
                status: 'remaining'
            });
            onOrderCreated();
            close();
        } catch (error) {
            console.error('Error creating todo:', error);
            alert('Failed to create todo');
        }
    }
    return (
    <div className="rounded-lg p-5 w-1/3 bg-white">
        <div className="flex justify-between items-center mb-4">
            <p className="text-2xl font-semibold">Add New Item</p>
            <svg onClick={close} cursor="pointer" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
        </div>
        <div className="flex flex-col gap-3">
            <input type="title" className="w-full rounded bg-neutral-200 p-2 px-4" placeholder="Title"></input>
            <textarea className="w-full rounded bg-neutral-200 p-2 px-4" placeholder="Description"></textarea>
        </div>
        <button onClick={handleSubmit} className="mt-4 w-full bg-green-300 text-green-700 px-4 py-2 rounded hover:bg-green-400">
            Save
        </button>
    </div>
  )
}

export default Add