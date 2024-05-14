import React, { useEffect, useState } from 'react';
import Image from 'next/image'

export default function MainHero() {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        // 컴포넌트가 마운트되면 애니메이션을 활성화합니다.
        setLoaded(true);
    }, []);

    return (
        <div className='flex flex-col items-center h-[calc(80%)] md:pt-12 space-y-8'>
            {/* <div className='right-20 top-20 absolute rounded-lg bg-white border-[10px] border-gray-900 h-[30rem] w-[22rem]'>
            </div> */}
            <div className={`flex flex-col items-center text-4xl md:text-6xl font-semibold`} >
                <p className={`transition-all duration-700 ease-in transform ${loaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>작성 하고</p>
                <p className={`transition-all duration-700 ease-in transform ${loaded ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'}`}>다시 물어보세요!</p>
            </div>
            <div onClick={() => { alert('구현 예정') }} className={`flex flex-col items-center text-md md:text-2xl transition-all duration-700 ease-in transform ${loaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}>
                작성한 메모를 학습한 AI에게 다시 물어보세요
            </div>

            <div className={`space-x-4 transition-all duration-700 ease-in transform ${loaded ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}>
                <a href='/list' className='bg-main dark:text-darkbase rounded-lg text-md md:text-lg px-3 py-1.5 font-semibold'>메모 하러 가기</a>
                <a className='bg-base dark:bg-darkbase rounded-lg text-md md:text-lg px-3 py-1.5 font-semibold'>사용 방법 알아보기</a>
            </div>

            <img className={`w-[calc(90%)] md:w-[calc(60%)] py-14 transition-all duration-700 ease-in transform ${loaded ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`} src={'/cloud.png'} />
        </div>
    )
}
