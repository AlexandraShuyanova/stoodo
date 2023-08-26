import styles from "./AuthForm.module.scss"
import {Button} from "@/components/UI/Button/Button";
import {TextField} from "@/components/UI/TextField/TextField";
import React, {useState} from "react";
import {LoginRequest, useGetListPublishedQuery, useLoginMutation} from "../../../../services/StoodoService";
import { useDispatch } from 'react-redux'
import {setCredentials} from "../../../../store/authSlice";

export const AuthForm = () => {

    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    const [formState, setFormState] = React.useState<LoginRequest>({
        email: '',
        password: '',
        saveSession: false,
    })

    const handleChange = ({
                              target: { name, value, checked=false },
                          }: React.ChangeEvent<HTMLInputElement>) => {
        if (name=="saveSession")
            setFormState((prev) => ({ ...prev, [name]: checked }))
        else
            setFormState((prev) => ({ ...prev, [name]: value }))
    }

    const handleLogin = async() => {
            try {
                const user = await login(formState).unwrap()
                dispatch(setCredentials(user))
                window.location.reload()

            } catch (err) {
                dispatch(setCredentials({access_token:null}))
            }
    }

    return (
        <form className={styles.form} onSubmit={handleLogin} action="javascript:void(0);">
            <h1>STOODO</h1>
            <TextField
                className={styles.input}
                name='email'
                onChange={handleChange}
                type='text'
                placeholder='Enter email'
            />
            <TextField
                className={styles.input}
                name='password'
                onChange={handleChange}
                type='password'
                placeholder='Enter password'
            />
            <div className={styles.checkbox}>
                <input
                    type="checkbox"
                    id="saveSession"
                    name="saveSession"
                    onChange={handleChange}
                />
                <label htmlFor="saveSession">Save session</label>
            </div>
            <Button className={styles.btn} onClick={handleLogin}>
                Log In
            </Button>
        </form>
    )}