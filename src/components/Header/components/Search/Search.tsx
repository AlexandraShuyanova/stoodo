import styles from './Search.module.scss';
import {TextField} from '@/components/UI/TextField/TextField';

export const Search = ({...props}) => {
    return (
        <>
            <form className={styles.form}>
                <TextField
                    className={styles.search}
                    placeholder='Search'
                />
            </form>
        </>
    )
}