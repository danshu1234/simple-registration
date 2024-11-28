'use client'

import { ChangeEvent, FC, useEffect, useState } from "react"
import { CaptchaArr } from "./CaptchaArr"
import { useDispatch } from "react-redux"
import './reg.css'

interface Captcha{
    url: string,
    trueAnswer: string,
}

const Captcha: FC = () => {

    const dispatch = useDispatch()
    const [captcha, setCaptcha] = useState <Captcha> ({url: '', trueAnswer: ''})
    const [attemps, setAttemps] = useState <number> (0)
    const [input, setInput] = useState <string> ('')
    let cap;

    const handleCaptcha = () => {
        if (input !== captcha.trueAnswer) {
            setAttemps(attemps + 1)
        } else if (input === captcha.trueAnswer) {
            dispatch({type: 'SUCCES'})
        }
        setInput('')
    }

    if (captcha.url !== '') {
        cap = <div>
            <img src = {captcha.url} width={70} height={70} className="captcha-img"/>
            <input onChange={(event: ChangeEvent<HTMLInputElement>) => setInput(event.target.value)} value={input} placeholder="captcha"/>
            <button onClick={handleCaptcha}>Save</button>
        </div>
    } else if (captcha.url === ''){
        cap = <p></p>
    }

    useEffect(() => {
        const randomNum = Math.floor(Math.random() * (5 - 1 + 1)) + 1
        const randomCaptcha = CaptchaArr[randomNum]
        setCaptcha(randomCaptcha)
    }, [attemps])

    useEffect(() => {
        if (attemps === 3) {
            window.location.href = '/timer'
        }
    }, [attemps])

    return (
        <div>
            {cap}
        </div>
    )
}

export default Captcha