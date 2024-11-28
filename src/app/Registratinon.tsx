// Registration.tsx
'use client'

import { FC, useEffect, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import Link from "next/link";
import Captcha from "./Captcha";
import './reg.css';

interface Errors {
    name?: string,
    password?: string,
    againPassword?: string,
}

const Registration: FC = () => {
    const [captcha, setCaptcha] = useState<boolean>(false);
    const [attemps, setAttemps] = useState<number>(5);
    const dispatch = useDispatch();
    const [btn, setBtn] = useState<string>('minus');
    let butt;
    let cap;

    if (captcha === true) {
        cap = <Captcha/>;
    }

    if (btn === 'minus') {
        butt = <button type="submit" onClick={() => setAttemps(attemps - 1)}>Submit</button>;
    } else if (btn === 'timer') {
        butt = <Link href={'/timer'}><button>Submit</button></Link>;
    }

    useEffect(() => {
        if (attemps === 1) {
            setBtn('timer');
        }
    }, [attemps]);

    return (
        <div className="reg">
            <Formik
                initialValues={{
                    name: '',
                    password: '',
                    againPassword: ''
                }}
                validate={values => {
                    const errors: Errors = {};
                    if (!values.name) {
                        errors.name = 'Required';
                    }
                    if (!values.againPassword) {
                        errors.againPassword = 'Required';
                    }
                    if (values.password.length < 8) {
                        errors.password = 'The password must consist of at least 8 characters';
                    }
                    if (values.password !== values.againPassword) {
                        errors.againPassword = 'Passwords dont match';
                    }
                    const password: string[] = values.password.split('');
                    const findSymbol1 = password.find(item => item === '$');
                    const findSymbol2 = password.find(item => item === '&');
                    const findSymbol3 = password.find(item => item === '#');
                    const findSymbol4 = password.find(item => item === '*');
                    const findSymbol5 = password.find(item => item === '!');
                    if (findSymbol1 === undefined && findSymbol2 === undefined && findSymbol3 === undefined && findSymbol4 === undefined && findSymbol5 === undefined) {
                        errors.password = 'Your password must contain at least one of the characters: $, *, &, ?, !';
                    }
                    return errors;
                }}
                onSubmit={values => {
                    setCaptcha(true);
                }}
            >
                <Form>
                    <label htmlFor="name">
                        <Field name='name' placeholder='Name' />
                        <ErrorMessage name="name" component="div" className="error" />
                    </label>
                    <label htmlFor="password">
                        <Field name='password' placeholder='Password' type='password' />
                        <ErrorMessage name="password" component="div" className="error" />
                    </label>
                    <label htmlFor="againPassword">
                        <Field name='againPassword' placeholder='Repeat Password' type='password' />
                        <ErrorMessage name="againPassword" component="div" className="error" />
                    </label>
                    {butt}
                </Form>
            </Formik>
            {cap}
        </div>
    );
}

export default Registration;
