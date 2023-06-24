import React, {ButtonHTMLAttributes, FC, forwardRef, ReactNode} from "react";
import styles from "./Button.module.scss";
import classNames from 'classnames';



interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    startIcon?: ReactNode;
}
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({className, children, startIcon=null, ...props}) => {
    return(
        <button {...props} className={classNames(className, styles.btn)}
        >
            {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
            {children}
        </button>
    )
})

Button.displayName = 'Button'