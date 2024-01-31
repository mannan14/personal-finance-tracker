// @ts-nocheck
import { useEffect } from 'react';
import DashboardLayout from '@/layout/dashboardLayout';
import axios from 'axios';
import { convertDate } from '@/config/function';
import { useTransactionContext } from '@/context/transactionContext';

const Transaction = () => {
    const { transaction } = useTransactionContext();
    useEffect(() => {   
        // Fetching transactions history 
    })
    
    return (
        <DashboardLayout page='transactions'>
            <div className='max-h-full overflow-auto'>
                <div className="max-w-2xl w-full mx-auto flex flex-col items-center space-y-10 px-2 md:px-0 pt-10 pb-20 scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-300">
                    <div className='space-y-4 border border-me-green-200 p-4 rounded-xl w-full'>
                        <p className='mt-2 text-center text-xl leading-9 text-black dark:text-white-100'>
                            Your Transactions
                        </p>
                        <div className="w-full h-full">
                            <table className='table-auto w-full '>
                                <thead className='w-full  border-b-[1px] border-b-me-green-200 dark:border-b-white-200/30'>
                                    <tr className=''>
                                        <th className='border-r-[1px] border-r-me-green-200 dark:border-r-white-200/30'>
                                            Date
                                        </th>
                                        <th className='border-r-[1px] border-r-me-green-200 dark:border-r-white-200/30'>
                                            Type
                                        </th>
                                        <th className='border-r-[1px] border-r-me-green-200 dark:border-r-white-200/30'>
                                            Amount
                                        </th>
                                        <th className='border-r-me-green-200 dark:border-r-white-200/30'>
                                            Description
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='w-full'>
                                    {
                                        transaction.map((data,idx) => (
                                            <tr className="text-center border-t-[1px] border-t-me-green-200 dark:border-t-white-200/30" key={idx}>
                                                <td className='border-r-[1px] p-2 border-r-me-green-200 dark:border-r-white-200/30'>
                                                    {/* {data.date.N + " " + data.month.S + " " + data.year.N} */}
                                                    {convertDate(data.date.S)}
                                                </td>
                                                <td className='border-r-[1px] border-r-me-green-200 dark:border-r-white-200/30'>
                                                    {data.type.S}
                                                </td>
                                                <td className='border-r-[1px] border-r-me-green-200 dark:border-r-white-200/30'>
                                                    {data.amount.N}
                                                </td>
                                                <td className=' border-r-me-green-200 dark:border-r-white-200/30'>
                                                    {data.description.S}
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Transaction