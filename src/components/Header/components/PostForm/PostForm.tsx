import styles from "./PostForm.module.scss"
import {TextField} from "@/components/UI/TextField/TextField";
import {Button} from "@/components/UI/Button/Button";
import React from "react";
import {
    CreatePostRequest,
    LoginRequest,
    useCreatePostMutation,
    useLoginMutation
} from "../../../../services/StoodoService";
import {useDispatch} from "react-redux";
import {setCredentials} from "../../../../store/authSlice";
export const PostForm = () => {

    const dispatch = useDispatch()

    const [createPost, { isLoading }] = useCreatePostMutation()

    const [formState, setFormState] = React.useState<CreatePostRequest>({
        title: '',
        description: '',
        imageID: '61e59ebd-52d4-4d0c-bda1-33436f0bee4f',
    })

    const handleChange = ({
                              target: { name, value},
                          }: React.ChangeEvent<HTMLInputElement>) => {
        setFormState((prev) => ({ ...prev, [name]: value }))
    }

    const handleLogin = async() => {
        try {
            const post = await createPost(formState).unwrap()
            console.log(post)
            dispatch(setCredentials(user))

        } catch (err) {
            console.log(err)
        }
    }

    return(
        <form className={styles.form}>
            <div className={styles.postContent}>
                <TextField
                    className={styles.input}
                    type="text"
                    placeholder="Title"
                />
                <TextField
                    className={styles.input}
                    type="text"
                    placeholder="Description"
                />
                <Button className={styles.btn} >
                    Publish
                </Button>
            </div>
        </form>
    )
}