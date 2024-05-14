'use client'
import Modal from '@/components/Modal';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import MemoApi from "@/api/MemoApi";
import ReactDOM from 'react-dom';
import { format, parseISO } from 'date-fns';

function MemoContainer(memo: any) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const modalRoot = document.querySelector('#modal-root');

    return (
        <>
            <div className='relative flex flex-col h-full min-h-[20rem] aspect-auto space-y-4 '>
                <a href={`/memo/${memo.memo.unique_id}`} className='flex-1 flex flex-col justify-end p-4 bg-main shadow-yellow-600 shadow-md' />
                <div className='px-2 absolute bottom-16 w-full h-8 z-20' onClick={openModal}>
                    <button className='w-full h-full  bg-white rounded-lg' onClick={openModal}>
                    </button>
                </div>
                <div className='h-8 w-full'>
                    <p className='text-sm font-semibold text-green-600'>{memo.memo.title}</p>
                    <p className='text-xs'>
                        {/* 2024/3/31 10:19 AM */}
                        {format(memo.memo.create_date, "yyyy/MM/dd h:mm a")}
                    </p>
                </div>
            </div>

            {isModalOpen && modalRoot && ReactDOM.createPortal(
                <Modal onClose={closeModal} isOpen={isModalOpen} size={"w-[calc(80%)] aspect-[4/5] md:aspect-[4/3] max-w-[700px]"}>
                    <div className="w-full h-full flex flex-col justify-center items-center">
                        검색 기능 구현 예정
                    </div>
                </Modal>, modalRoot)}
        </>
    )
}

export default function Page() {
    const { data: session } = useSession();
    const [memos, setMemos] = useState([]);

    const handleGetMemo = async () => {
        try {
            const api = new MemoApi();
            const memos = await api.getMemo(session?.user?.email);
            console.log(memos)
            setMemos(memos)
            return memos
        } catch (error) {
            console.error(error)
        }
    }

    const handleCreateMemo = async () => {
        try {
            const memoIn = {
                users: [session?.user?.email]
            }
            const api = new MemoApi();
            var responseData = await api.createMemo(memoIn);
            handleGetMemo()
            return responseData
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (session) {
            handleGetMemo()
        }
    }, [session])

    return (
        <div className='w-full h-full flex flex-col '>
            <div className='w-full h-12 md:h-16 px-6 md:px-96 '>
                <div className='h-full w-full flex justify-between items-center'>
                    <p>정렬</p>
                    <button className='px-3 py-1 bg-darkpoint rounded-md' onClick={() => { handleCreateMemo() }}>추가</button>
                </div>
            </div>
            <div className='flex-1 px-6 md:px-96 overflow-auto'>
                <div className='w-full flex-1 grid grid-cols-2 md:grid-cols-4 gap-6'>
                    {memos ?
                        <>
                            {memos.map((memo, index) => (
                                <div key={index}>
                                    <MemoContainer memo={memo} />
                                </div>
                            ))}
                        </>
                        :
                        <>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}
