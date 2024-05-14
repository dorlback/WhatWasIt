'use client'
import UserApi from "@/api/UserApi";
import { signIn, signOut, useSession } from "next-auth/react";
import DarkMode from "./DarkMode";
import { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import Modal from "./Modal";
import OffCanvas from "./OffCanvas";
import { CiLogin } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiFillGoogleSquare } from "react-icons/ai";

export default function NavBar() {
    const { data: session } = useSession();
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);

    const [modalRoot, setModalRoot] = useState<any>(null)
    const [offCanvasRoot, setOffCanvasRoot] = useState<any>(null)


    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openOffCanvas = () => {
        setIsOffCanvasOpen(true);
    };

    const closeOffCanvas = () => {
        setIsOffCanvasOpen(false);
    };


    useEffect(() => {
        setModalRoot(document.querySelector('#modal-root'))
        setOffCanvasRoot(document.querySelector('#offcanvas-root'))
    }, [])

    return (
        <div className="px-4 md:px-10 flex items-center justify-between w-full h-14 dark:bg-darkbase dark:text-darksub bg-base text-point">
            <div>
                <a href="/list" className="font-bold">
                    아 뭐였더라? (배포판)
                </a>
            </div>
            <div>
                <>
                    <div className="flex space-x-4">
                        <button className="block md:hidden" onClick={() => { openOffCanvas() }}><RxHamburgerMenu /></button>
                        {session ?
                            <button className={`flex justify-center items-center px-4 py-0.5 bg-main dark:bg-main text-darkbase rounded-md shadow space-x-4`} onClick={() => signOut()}><p>로그아웃</p></button>
                            :
                            <>
                                <button className="hidden md:block" onClick={() => { setIsLogin(true); openModal(); }}>로그인</button>
                                <button className="hidden md:block bg-lime-200 dark:bg-lime-900 px-1 py-1 rounded-md" onClick={() => { setIsLogin(false); openModal(); }}>무료 회원가입</button>
                            </>
                        }
                        {isModalOpen && modalRoot && ReactDOM.createPortal(
                            <Modal onClose={closeModal} isOpen={isModalOpen} size={"w-[calc(70%)] aspect-[4/5] md:aspect-[4/3] max-w-[500px]"}>
                                <div className="w-full h-full flex flex-col justify-center items-center">

                                    {isLogin ?
                                        <button className={`hidden md:flex items-center px-5 py-3 bg-slate-200 dark:bg-blue-500 text-lg rounded-md shadow space-x-4`} onClick={() => signIn()}><AiFillGoogleSquare className="text-3xl" /> <p>구글 로그인</p></button>
                                        :
                                        <button className={`hidden md:flex items-center px-5 py-3 bg-slate-200 dark:bg-blue-500 text-lg rounded-md shadow space-x-4`} onClick={() => signIn()}><AiFillGoogleSquare className="text-3xl" /> <p>구글 회원가입</p></button>
                                    }
                                </div>
                            </Modal>, modalRoot)}
                        {isOffCanvasOpen && offCanvasRoot && ReactDOM.createPortal(
                            <OffCanvas onClose={closeOffCanvas} isOpen={isOffCanvasOpen} >
                                <div className="w-full h-full flex flex-col py-20 justify-start items-center space-y-6">
                                    {session ?
                                        <button className={`flex justify-center items-center px-4 py-2 bg-slate-200 dark:bg-blue-500 rounded-md shadow space-x-4`} onClick={() => signOut()}><p>로그아웃</p></button>
                                        :
                                        <>
                                            <button className={`flex justify-center items-center w-[70%] py-2 bg-slate-200 dark:bg-blue-500 rounded-md shadow space-x-4`} onClick={() => signIn()}><AiFillGoogleSquare className="text-3xl" /> <p>구글 로그인</p></button>
                                            <button className={`flex justify-center items-center w-[70%] py-2 bg-slate-200 dark:bg-blue-500 rounded-md shadow space-x-4`} onClick={() => signIn()}><AiFillGoogleSquare className="text-3xl" /> <p>구글 회원가입</p></button>
                                        </>
                                    }

                                </div>
                            </OffCanvas>, offCanvasRoot)}
                        <DarkMode />
                    </div>
                </>

            </div>
        </div >
    )
}