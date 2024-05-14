'use client'
import React from 'react'


interface iModal {
    onClose: any;
    isOpen: any;
    size: any;
    children: any;
}

export default function Modal({ onClose, isOpen, size, children }: iModal) {
    return (
        <div className='relative flex items-center justify-center w-screen h-[calc(100vh)]'>
            <div className='absolute top-0 left-0 h-full w-full bg-black opacity-40' onClick={onClose} />
            <div className={`relative ${size} bg-white dark:bg-gray-700 rounded-xl z-50`}>
                <button onClick={onClose} className='bg-darkpoint text-lime-50 px-2 pt-0.5 pb-1 absolute right-2 top-2 md:right-4 md:top-4 text-sm rounded-xl'>close</button>
                {children}
            </div>
        </div>
    )
}
