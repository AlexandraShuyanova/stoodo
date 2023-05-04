import React, {FC} from 'react'
import classNames from 'classnames'
import styles from './TextField.module.scss';

interface TextFieldProps {
    className?: string
    placeholder?: string
}

export const TextField: FC<TextFieldProps> = ({className, ...props}) => {
    return (
        <input className={classNames(styles.textField, className)}
            {...props}>
        </input>
    )
}