import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import styles from './PostContent.module.scss';
import {PostContentResponse} from "@/types/IPost";
import {FC} from "react";

interface PostContentProps {
    item: PostContentResponse
}

export const PostContent: FC<PostContentProps> = ({item}) => {
    const {text} = {...item}

    return (
        <Card className={styles.postContent}>
            <div className={styles.cardMainContent}>
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        {text}
                    </Typography>
                </CardContent>
            </div>
        </Card>
    );
}
