import styles from "./AuthForm.module.scss"
import {Button} from "@/components/UI/Button/Button";
import {TextField} from "@/components/UI/TextField/TextField";
import React, {useState} from "react";
import {LoginRequest, useLoginMutation} from "../../../../services/StoodoService";

export const AuthForm = () => {

    const [login, { isLoading }] = useLoginMutation()

    const [formState, setFormState] = React.useState<LoginRequest>({
        username: '',
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
                console.log(user.access_token)
            } catch (err) {
                console.log(err)
            }
    }

    return (
        <form className={styles.form} onSubmit={handleLogin} action="javascript:void(0);">
            <h1>STOODO</h1>
            <TextField
                className={styles.input}
                name='username'
                onChange={handleChange}
                type='text'
                placeholder='Enter username'
            />
            <TextField
                className={styles.input}
                name='password'
                onChange={handleChange}
                type='password'
                placeholder='Enter password'
            />
            <div className={styles.input}>
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