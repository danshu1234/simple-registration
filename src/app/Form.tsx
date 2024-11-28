'use client'

import { FC, useState } from "react";
import Registration from "./Registratinon";
import Succes from "./Succes";
import './reg.css'
import { useSelector } from "react-redux";

interface Store {
    el: string,
}

const Form: FC = () => {

    const el = useSelector((state: Store) => state.el)
    let element;

    if (el === 'registration') {
        element = <Registration/>
    } else if (el === 'succes') {
        element = <Succes/>
    }
    
    return (
        <div className="form-main">
            {element}
        </div>
    )
}

export default Form