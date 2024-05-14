'use client'
import React, { useEffect, useState } from 'react'
import MemoApi from "@/api/MemoApi";
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import CustomEditor from '@/components/CustomEditor';
import { format, parseISO } from 'date-fns';
import HtmlRenderer from '@/components/HtmlRenderer';
import ReactDOM from 'react-dom';
import Modal from '@/components/Modal';

export default function Page() {
    const router = useParams()
    const _router = useRouter()
    const { data: session } = useSession();
    const [isUuidValid, setIsUuidValid] = useState(true);
    const [isUserAuthorized, setIsUserAuthorized] = useState(false);
    const [memo, setMemo] = useState();
    const [memoTitle, setMemoTitle] = useState('');
    const [memoCreateDate, setMemoCreateDate] = useState('');
    const [memoContent, setMemoContent] = useState();
    const [height, setHeight] = useState(500);
    const [shareMemoUserEmail, setShareMemoUserEmail] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false)

    const modalRoot = document.querySelector('#modal-root');

    // 1.유효한 uuid 인지, 권한 있는지 확인, memo 내용 가져오기
    // 2.에디터 기능 넣기
    // 3. 저장 넣기
    // 4. 삭제 넣기
    // 5. 수정 넣기

    useEffect(() => {
        if (session) {
            handleIsValidUuid()
        }
    }, [session, router])

    useEffect(() => {
        if (!isUuidValid) {
            alert('유효하지 않는 메모 입니다.')
        }
    }, [isUuidValid])


    useEffect(() => {
        const element = document.getElementById('editor-contents');
        if (element) {
            setHeight(element.clientHeight - 39)
        }
    }, [isUserAuthorized]);

    const handleIsValidUuid = async () => {
        try {
            const api = new MemoApi();
            const responseData = await api.isValidUuid({ 'uuid': router.memoid.toString(), "user_email": session?.user?.email });
            setIsUuidValid(responseData.uuid_valid)
            setIsUserAuthorized(responseData.user_authorized)
            setMemoCreateDate(format(responseData.memo.create_date, "yyyy/MM/dd h:mm a"))
            setMemo(responseData.memo)
            setMemoTitle(responseData.memo.title)
            setMemoContent(responseData.memo.content)
            return responseData
        } catch (error) {
            console.error(error)
        }
    }

    const handleUpdateMemo = async () => {
        try {
            const api = new MemoApi();
            const memoIn = {
                "unique_id": router.memoid,
                "title": memoTitle,
                "content": memoContent
            }
            const responseData = await api.updateMemo(memoIn);
            alert('저장이 완료 되었습니다.')
            setMemo(responseData.memo)
            setMemoTitle(responseData.memo.title)
            setMemoContent(responseData.memo.content)

            return responseData
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteMemo = async () => {
        try {
            const api = new MemoApi()
            const unique_id = router.memoid
            const responseData = await api.deleteMemo(unique_id.toString())
            alert('삭제 되었습니다.')
            _router.push('/list')
        } catch (error) {
            console.log(error)
        }
    }

    const handleShareMemo = async () => {
        try {
            const api = new MemoApi()
            const unique_id = router.memoid
            const shareMemoIn = { "unique_id": unique_id, 'user_email': shareMemoUserEmail }
            const responseData = await api.shareMemo(shareMemoIn)
            alert('공유가 완료 되었습니다.')
        } catch (error) {
            alert('올바르지 않은 이메일 혹은 메모 입니다.')
            console.log(error)
        }
    }

    const handleShareUserInput = (e: any) => {
        setShareMemoUserEmail(e)
    }

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleShareButton = () => {
        handleShareMemo()
    }

    const handleDeleteButton = () => {
        handleDeleteMemo()
    }

    const handleUpdateButton = () => {
        handleUpdateMemo()
    }

    const handleTitleOnChange = (e: any) => {
        setMemoTitle(e)
    }

    return (
        <>
            {isUserAuthorized ?
                <>
                    <div className='px-3 pt-1.5 flex justify-between'>
                        <button onClick={() => { handleDeleteButton() }} className='px-2 py-1.5 text-sm bg-red-300 dark:text-black rounded-md'>삭제</button>
                        <button onClick={() => { openModal() }} className='px-2 py-1.5 text-sm bg-darkpoint dark:text-black rounded-md'>공유</button>
                    </div>
                    <div className='flex items-center h-12 py-2 space-x-2 px-2'>
                        <p>제목 :</p>
                        <input type='text' value={memoTitle} onChange={(e) => { handleTitleOnChange(e.target.value) }} className='h-full flex-1 bg-white px-2 rounded-md dark:bg-darkbase' />
                    </div>
                    <div id='editor-contents' className='flex-1'>
                        <CustomEditor
                            className='h-full '
                            initialData=''
                            value={memoContent}
                            // onChange={(e) => { handleContentOnChange(e.target.value) }}
                            setMemoContent={setMemoContent}
                        />
                        <style >
                            {`
                        .ck-editor__editable {
                            min-height: ${height}px;
                        }
                        .ck-editor {
                            color: rgb(0,0,0);
                        }
                    `}
                        </style>
                    </div>
                    <div className='h-12 flex justify-between items-center px-2'>
                        <button onClick={() => { _router.back() }} className='px-3 py-1.5 text-sm bg-slate-400 dark:text-black rounded-md'>뒤로</button>
                        <p>작성일 : {memoCreateDate}</p>
                        <button onClick={() => { handleUpdateButton() }} className='px-3 py-1.5 text-sm bg-green-300 dark:text-black rounded-md'>저장</button>
                    </div>
                </>
                :
                <>
                    <div className='flex items-center justify-center h-12 py-2 space-x-2 px-2'>
                        <p>{memoTitle}</p>
                    </div>
                    <div>
                        <HtmlRenderer htmlContent={memoContent} />
                    </div>
                </>
            }

            {isModalOpen && modalRoot && ReactDOM.createPortal(
                <Modal onClose={closeModal} isOpen={isModalOpen} size={"w-[calc(80%)] md:w-[calc(40%)] max-w-[700px]"}>
                    <div className="w-full h-full flex flex-col justify-center items-center pt-16 pb-6 px-8">
                        <div className='w-full h-14'>
                            <input value={shareMemoUserEmail} onChange={(e) => { handleShareUserInput(e.target.value) }} placeholder="공유할 Email 입력" className='px-4 w-full h-full bg-slate-100 dark:bg-slate-600' type='text'></input>
                        </div>
                        <div className='w-full my-4 flex justify-end'>
                            <button onClick={() => { handleShareButton() }} className='px-3 py-1 bg-darkpoint rounded-md'>공유</button>
                        </div>
                    </div>
                </Modal>, modalRoot)}
        </>
    )
}