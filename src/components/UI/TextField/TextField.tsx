import React, {FC} from 'react'
import classNames from 'classnames'
import styles from './TextField.module.scss';

interface TextFieldProps {
    className?: string
    type?: string
    label?: string
    placeholder?: string
}

export const TextField: FC<TextFieldProps> = ({className, label, type,...props}) => {
    return (
        <label className={classNames(styles.label, className)}>
            {label && <span className={styles.caption}>{label}</span>}
            <input className={styles.textField}
                   {...props}>
            </input>
        </label>
    )
}