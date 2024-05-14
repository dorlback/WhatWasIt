'use client'
import React from 'react'

interface iOffCanvas {
    onClose: any;
    isOpen: any;
    children: any;
}

export default function OffCanvas({ onClose, isOpen, children }: iOffCanvas) {
    return (
        <div className='relative flex items-center justify-start w-screen h-[calc(100vh)]'>
            <div className='absolute top-0 left-0 h-full w-full bg-black opacity-40' onClick={onClose} />
            <div className={`relative w-[60%] md:w-[40%] max-w-[400px] h-full bg-white dark:bg-gray-700  rounded-r-xl z-50 transition-transform duration-500`}
                style={{ animation: 'slide-in 0.5s forwards' }}
            >
                <button onClick={onClose} className='bg-darkpoint text-lime-50 dark:text-darkbase px-2 pt-0.5 pb-1 absolute right-2 top-2 md:right-4 md:top-4 text-sm rounded-xl'>close</button>
                {children}
            </div>
            <style>
                {`
                    @keyframes slide-in {
                        from { transform: translateX(-100%); }
                        to { transform: translateX(0); }
                    }
                `}
            </style>
        </div>
    )
}
