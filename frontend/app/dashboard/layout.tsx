import React from 'react';
import DashboardNavbar from '@/components/nav/DashboardNavbar';

export default function DashboardLayout({

    children
} : { children: React.ReactNode; }) {
    return (
        <>
            <DashboardNavbar />
            <main className='p-4'>
                {children}
            </main>
        </>
    )
}