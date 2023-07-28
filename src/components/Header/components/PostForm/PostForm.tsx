import styles from "./PostForm.module.scss"
import {TextField} from "@/components/UI/TextField/TextField";
import {Button} from "@/components/UI/Button/Button";
import React, {useState} from "react";
import {CreatePostRequest, useCreatePostMutation, useUploadImageMutation} from "../../../../services/StoodoService";
import {useDispatch} from "react-redux";
import {IImage} from "@/types/IPost";

export const PostForm = () => {

    const dispatch= useDispatch()

    const [image, setImage] = useState<any>()

    const [file, setFile] = useState<any|null>(null)

    const [createPost] = useCreatePostMutation()
    const [uploadImage] = useUploadImageMutation()


    const [formState, setFormState] = React.useState<CreatePostRequest>({
        title: '',
        slug: '',
        image: '',
        description: '',
        topic: '6b29e6cb-02b5-4ea1-a3d9-a65b4e89ebb8',
        tagsList: []
    })


    const handleChange = ({
                              target: { name, value},
                          }: React.ChangeEvent<HTMLInputElement>) => {
        if(name == 'tagsList')
        {
            setFormState((prev) => ({...prev, [name]: value.split('#')}))
        }
        else
            setFormState((prev) => ({ ...prev, [name]: value }))
    }

    const handleCreatePost = async() => {
        try {
            const formData = new FormData()
            formData.append('file', file[0], file[0].name)

            const image = await uploadImage(formData).unwrap()

            let id = image.id

            if (!id) {
                return;
            }
            
            formState.image = id;

            const post = await createPost(formState).unwrap()
            console.log(post)
            window.location.reload()

        } catch (err) {
            console.log(err)
        }
    }

    return(
        <form className={styles.form} onSubmit={handleCreatePost} action="javascript:void(0);">
            <div className={styles.postContent}>
                <TextField
                    className={styles.input}
                    name='title'
                    type="text"
                    placeholder="Title"
                    onChange={handleChange}
                />
                <TextField
                    className={styles.input}
                    name='description'
                    type="text"
                    placeholder="Description"
                    onChange={handleChange}
                />
                <TextField
                    className={styles.input}
                    name='slug'
                    type="text"
                    placeholder="Slug"
                    onChange={handleChange}
                />
                <TextField
                    className={styles.input}
                    name='tagsList'
                    type="text"
                    placeholder="Tags"
                    onChange={handleChange}
                />
                <input type="file" onChange={event => setFile(event.target?.files)}/>
                <Button className={styles.btn} onClick={handleCreatePost} >
                    Publish
                </Button>
            </div>
        </form>
    )
}