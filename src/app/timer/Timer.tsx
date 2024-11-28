// Timer.tsx
'use client'

import { FC, useEffect, useState } from "react";
import './timer.css'

const Timer: FC = () => {
    const [sec, setSec] = useState<number>(60);

    useEffect(() => {
        const interval = setInterval(() => {
            setSec(prevSec => prevSec - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (sec === 0) {
            window.location.href = '/';
        }
    }, [sec]);

    return (
        <div className="timer-container">
            <h2>Registration form will be available after {sec} seconds</h2>
        </div>
    );
}

export default Timer;
