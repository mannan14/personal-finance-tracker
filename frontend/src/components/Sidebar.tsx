import React, { useState,useEffect,useContext } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import axios from 'axios';

import Modal from '../components/Modal'
const DarkLine = dynamic (() => import('../utils/sidebar_icons/DarkLine'), {
  ssr: false,
});
const LightLine = dynamic (() => import('../utils/sidebar_icons/LightLine'), {
  ssr: false,
});

type SidebarProps = {
    isTab:boolean,
    isOpen:boolean,
    setIsOpen:React.Dispatch<React.SetStateAction<boolean>>,
    page:string,
    theme:string | undefined,
}

const Sidebar = ({
    isTab, 
    isOpen, 
    setIsOpen,
    page,
    theme,
}:SidebarProps) => {
  const router = useRouter();
  const { pathname } = router;
  const [errorNumber, setErrorNumber] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        isTab && setIsOpen(false)
    }, [pathname]);

    return (
    <>
      <div
        className={`${isOpen ? `` : `hidden`}` + " fixed inset-0 max-h-screen z-[999] md:hidden bg-black/50"}
        onClick={() => setIsOpen(false)}
      />      
      <div
        className={`${
          isOpen ? ` ` : `transform -translate-x-full `
        } ease-in-out duration-200 bg-gradient-to-br from-white-100 to-me-green-200/50 dark:bg-dashboard-gradient inset-0 backdrop-blur-3xl rounded-lg p-2 space-y-4 text-gray shadow-md z-[999] w-[16rem] max-w-[16rem] h-screen overflow-hidden md:relative fixed`}>
        {/* logo */}
        <div className="flex flex-col gap-2.5 py-[5px] text-white-100 items-center justify-center">
          {
            theme === 'dark'?
            (
                <p className="text-white text-2xl font-bold">LOGO</p>
            ):
            (
                <p className="text-black text-2xl font-bold">LOGO</p>
            )
          }
          {
            theme === 'dark' ?
            (
              <LightLine/>
            ):
            (
              <DarkLine/>
            )
          }
        </div>

        <div
            className="flex px-4 p-2 dark:text-white-100 bg-me-green-200 dark:bg-gray-700/50 rounded-lg items-center justify-center hover:bg-me-green-200/90 dark:hover:bg-gray-700/40 cursor-pointer focus:bg-blue-200"
            onClick={() => setModalOpen(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 mr-3">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add Transaction
        </div>

        <div className='h-full'>
            <div className="flex flex-col items-center h-full space-y-2">
              <div className="whitespace-pre flex flex-col text-left w-full gap-1 p-1 h-[46%] md:h-[50%] font-medium overflow-x-hidden overflow-y-auto scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-300">
                <div className={`p-2 dark:text-white-100 bg-me-green-200/90 link flex justify-between md:justify-start`}>
                  <button
                      onClick={()=>{
                          router.replace(`/`)
                          setIsOpen(!isTab)
                      }}
                      className="h-full w-full overflow-hidden text-left overflow-ellipsis"
                  >
                      View Charts
                  </button>
                </div>
                <div className={`p-2 dark:text-white-100 bg-me-green-200/90 link flex justify-between md:justify-start`}>
                    <button
                        onClick={()=>{
                            router.replace(`/transaction`)
                            setIsOpen(!isTab)
                        }}
                        className="h-full w-full overflow-hidden text-left overflow-ellipsis"
                    >
                        View Transactions
                    </button>
                </div>
              </div>
            </div>
        </div>
        {/* <YourVehicles
        isLoading={isLoading}
        vehicleData={vehicleData}
        setIsOpen={setIsOpen}
        isTab={isTab}
        page={
          page.toString().split("/")[0].trim() === "profile" || page === ""
          ?
          page
          :
          `vehicles / ${JSON.parse(page.toString().split("/")[1]).vin}`
          }
        /> */}
      </div>
        <Modal 
            isOpen={modalOpen} 
            setIsOpen={setModalOpen} 
            title='Add a new transaction' 
            content={`Fill the details to add a new transaction `} 
            buttonClass='px-2 border text-black bg-me-green-200 hover:bg-me-green-100 p-1 rounded-lg' 
        />
    </>
  );
};

export default Sidebar;