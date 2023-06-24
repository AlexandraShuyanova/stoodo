import styles from "./AuthForm.module.scss"
import {Button} from "@/components/UI/Button/Button";
import {TextField} from "@/components/UI/TextField/TextField";
import React from "react";

export const AuthForm = () => {
    return (
        <div className={styles.content}>
            <h1>STOODO</h1>
            <TextField
                className={styles.input}
                type='username'
                placeholder='Enter username'
            />
            <TextField
                className={styles.input}
                type='password'
                placeholder='Enter password'
            />
            <Button className={styles.btn}>
                Log In
            </Button>
        </div>
    )}