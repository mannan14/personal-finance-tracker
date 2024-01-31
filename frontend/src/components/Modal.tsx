import React,{ Fragment, useState }  from 'react'
import { Dialog, Transition } from '@headlessui/react'
import axios from 'axios'
import { convertDate } from '@/config/function'
import { useTransactionContext } from '@/context/transactionContext'

type ModalProps = {
    isOpen:boolean;
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>;
    title:string;
    content:string;
    buttonClass:string;
}

const Modal = ({
    isOpen,
    setIsOpen,
    title,
    content,
    buttonClass,
}:ModalProps) => {

    const {getTransaction} = useTransactionContext()
    const date = new Date()
    const currentDate = convertDate(date.toISOString())
    // const [currentDate, setCurrentDate] = useState<string>(convertDate(date.toISOString()))
    const [amount, setAmount] = useState<number|any>(0)
    const [description, setDescription] = useState<string>("")
    const [type, setType] = useState<string>("need")

    // useEffect(()=>{
    //     // Store the transaction data in the DB
    // })
    const AddTransaction = () => {
        isNaN(amount)?
            alert("Amount not a number")
        :
        
            axios.post("http://localhost:5000/new", {
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    amount,
                    description,
                    type,
                    // day: parseInt(currentDate.split(" ")[0]),
                    // month: currentDate.split(" ")[1],
                    // year: parseInt(currentDate.split(" ")[2])
                    date: date.toISOString()
                },
            })
            .then((res) => {
                getTransaction()
                console.log(res);
                setIsOpen(false);
                setAmount(0);
                setDescription("");
                setType("need");
            })
            .catch((err) => {
              console.log({
                amount,
                description,
                type,
                date
                // day: currentDate.split(" ")[0],
                // month: currentDate.split(" ")[1],
                // year: currentDate.split(" ")[2]
              });
              console.log(err);
            });
        
    }
      

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-[9999]" onClose={()=>setIsOpen(false)}>
            <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 scale-95"
                        enterTo="opacity-100 scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 scale-100"
                        leaveTo="opacity-0 scale-95"
                    >
                        <Dialog.Panel className="w-full border-2 border-me-green-200 bg-white-100 max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                            <Dialog.Title
                                as="h3"
                                className="text-lg text-center font-medium text-black leading-6"
                            >
                                {title}
                            </Dialog.Title>
                            <div className="mt-2 flex flex-col space-y-4 text-medium text-center text-gray-600 leading-6">
                                <p>{content}</p>
                                <input 
                                    type="text" 
                                    className="p-1.5 px-2 rounded-xl border border-1"
                                    value={currentDate}
                                    disabled  
                                />
                                <input 
                                    type='number' 
                                    className="bg-white-100 p-1.5 px-2 rounded-xl border border-1"
                                    value={amount}
                                    placeholder='Amount'
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                <select onChange={(e) => setType(e.target.value)} className='bg-white-100 p-1.5 px-2 rounded-xl border border-1'>
                                    <option value="need">Needs</option>
                                    <option value="want">Wants</option>
                                    <option value="saving">Savings</option>
                                </select>
                                <input 
                                    type="text" 
                                    className="bg-white-100 p-1.5 px-2 rounded-xl border border-1"
                                    placeholder='Description'
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            
                            <div className="mt-4 w-full flex justify-around">
                                <button
                                    type="button"
                                    className={`w-24 `+ buttonClass}
                                    onClick={()=>AddTransaction()}
                                >
                                    Create
                                </button>
                                <button
                                    type="button"
                                    className={`w-24 px-2 border text-black bg-me-green-200 hover:bg-me-green-100 p-1 rounded-lg`}
                                    onClick={()=>setIsOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </Dialog.Panel>
                    </Transition.Child>
                </div>
            </div>
            </Dialog>
        </Transition>
    )
}

export default Modal