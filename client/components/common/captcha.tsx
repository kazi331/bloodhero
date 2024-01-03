'use client'
import { CheckCircle, RefreshCcwIcon } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect } from "react"
import { Input } from '../ui/input'


// const style = {
//     color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
// }

type propsTypes = {
    captchaText: string,
    captchaInput: string,
    setCaptchaText: Dispatch<SetStateAction<string>>,
    setCaptchaInput: Dispatch<SetStateAction<string>>,
    captchaVerified: boolean,
}
const Captcha = ({ captchaText, captchaInput, setCaptchaText, setCaptchaInput, captchaVerified }: propsTypes) => {
    const generateCaptcha = (length: number) => {
        const chars = [
            'A', 'a', '1', 'B', 'b', '2', 'C', 'c', '3', 'D',
            'd', '4', 'E', 'e', '5', 'F', 'f', '6', 'G', 'g',
            '7', 'H', 'h', '8', 'I', 'i', '9', 'J', 'j', '0',
            'K', 'k', 'L', 'l', 'M', 'm', 'N', 'n', 'O', 'o',
            'P', 'p', 'Q', 'q', 'R', 'r', 'S', 's', 'T', 't',
            'U', 'u', 'V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y',
            'Z', 'z', '0', '1', '2', '3', '4', '5', '6', '7',
            '8', '9', '!', '@', '#', '$', '%', '&', '?'
        ]
        let captcha = [];
        for (let i = 0; i <= (length - 1); i++) {
            const randIndex = Math.floor(Math.random() * chars.length)
            captcha.push(chars[randIndex]);
        }
        setCaptchaText(captcha.join(''));
        setCaptchaInput("")
    }
    useEffect(() => {
        generateCaptcha(6)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (

        <div className='my-2 py-2 '>
            {/* <canvas id='canvas' width={200} height={30} ></canvas> */}
            {/* <p className='text-xs text-gray-500 mb-2' > Enter the text below to veirfy you are human </p> */}
            <div className="flex items-center justify-center  space-x-2 md:space-x-4">
                <div className='text-indigo-700 text-2xl tracking-widest font-sans font-bold whitespace-nowrap pointer-events-none select-none'>
                    {
                        captchaText.split("").map((item, index) => <span key={index}
                        // style={{ color: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`, }}
                        >
                            {item}
                        </span>
                        )
                    }
                </div>
                <div className='relative'>
                    <Input className='w-full py-0 pr-10 ' onChange={e => setCaptchaInput(e.target.value)} value={captchaInput} id="captcha" />
                    {captchaVerified && <CheckCircle className='text-green-500 font-bold block w-4 h-full  absolute top-0 right-4 ' />}
                </div>
                <button onClick={() => generateCaptcha(6)} type='button' className='text-gray-600' tabIndex={-1}>
                    <RefreshCcwIcon className='active:scale-90 transition-transform' aria-description='refresh' />
                </button>
            </div>

        </div>



    )
}

export default Captcha

function setCaptchaInput(arg0: string) {
    throw new Error('Function not implemented.')
}
