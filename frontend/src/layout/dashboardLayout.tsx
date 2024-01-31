import React, { useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useTheme } from 'next-themes';

import {
  Sidebar,
  Navbar,
  SetValue
} from '@/components';
// import { DashboardLayoutProps } from '@/utils/props';
// import ProtectedRoute from '@/components/auth/ProtectedRoute';

type DashboardLayoutProps = {
  children: React.ReactNode;
  page: string;
}

const DashboardLayout = ({
  children,
  page,
}:DashboardLayoutProps ) => {
  const isTab = useMediaQuery({ query: '(max-width:767px)' });
  const [isOpen, setIsOpen] = useState(isTab ? false : true);

  const {theme, setTheme} = useTheme()
  
  useEffect(() => {
    isTab ? 
      setIsOpen(false)
    :
      setIsOpen(true)
  }, [isTab]);
  
  useEffect(() => {
    setTheme(theme||'dark')
  },[theme])

    return (
        <div className='relative flex'>
        <Sidebar 
            // NumberVehiclePaid={subscriptionData?.quantity}
            // idToken={IdToken}
            // id={userId}
            // isLoading={isLoading}
            // vehicleData={vehicleData||[]} 
            isOpen={isOpen} 
            setIsOpen={setIsOpen} 
            isTab={isTab}
            page={page}
            theme={theme}
        />
        <div className="max-w-full flex-1 h-screen overflow-hidden">
            <Navbar 
                isTab={isTab}
                // name={name} 
                // id={userId}
                page={page===undefined ? '' : page}
                setIsOpen={setIsOpen} 
                isOpen={isOpen} 
            />
            {children}
            <SetValue/> 
        </div>
        </div>
    );
};

export default DashboardLayout;
