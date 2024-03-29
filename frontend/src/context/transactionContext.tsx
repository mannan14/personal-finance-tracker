import React, {useState, useEffect, createContext, useContext, useMemo } from 'react'
import axios from 'axios';

type TransactionProp = {
    id:number, 
    amount:number, 
    description:string, 
    type:string, 
    date:number, 
    month:string, 
    year:number 
}

type TransactionContextProps = {
    transaction: TransactionProp[],
    getTransaction: () => Promise<void>,
    setTransaction: React.Dispatch<React.SetStateAction<never[]>>;
}

const TransactionContext = createContext({} as TransactionContextProps)
const TransactionProvider = ({children}: {children:React.ReactNode}) => {
    const [transaction, setTransaction] = useState([]) 
    
    const getTransaction = async () => {
        axios.get('http://localhost:5000/history')
        .then((res) => { 
            console.log(res.data)
            setTransaction(res.data.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        getTransaction()
    },[])

    const value = useMemo(()=>({
        transaction,
        setTransaction,
        getTransaction
    }),[transaction])

    return (
        <TransactionContext.Provider value = {value}>
            {children}
        </TransactionContext.Provider>
    )
}
const useTransactionContext = () => {
    const context = useContext(TransactionContext);
    if (!context) {
      throw new Error('useTransactionContext must be used within the AppProvider');
    }
    return context;
  };
  
  export { TransactionProvider, TransactionContext, useTransactionContext };