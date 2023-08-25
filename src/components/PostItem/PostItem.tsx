import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import styles from './PostItem.module.scss';
import {IPost} from "@/types/IPost";
import {FC, useEffect} from "react";
import {
    useLikePostMutation,
    useGetUserPostInteractionQuery, useGetPostContentByIdQuery, useGetPostStatByIdQuery
} from "../../services/StoodoService";

interface PostItemProps {
    item: IPost
}
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

export const PostItem: FC<PostItemProps> = ({item}) => {

    const {id, title, description, image, owner} = {...item}
    const [expanded, setExpanded] = React.useState(false);
    const userPostInteractionData = useGetUserPostInteractionQuery(id).data;
    const [liked, setLiked] = React.useState(false);
    const [likePost] = useLikePostMutation();
    const postContentData = useGetPostContentByIdQuery(id).data;
    const {data, isLoading, refetch} = useGetPostStatByIdQuery(id);
    
    useEffect(() => {
        if(userPostInteractionData != undefined)
            setLiked(userPostInteractionData?.liked)
    }, [userPostInteractionData])

    const likeClass = liked ? styles.likeActive : styles.likeInactive;

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleFavoriteClick = async() => {
        const isUserLikePost = await likePost({id, isLiked: !liked}).unwrap();
        refetch();
        setLiked(isUserLikePost.liked);
    };

    return (
        <Card className={styles.post}>
            <CardHeader className={styles.postHeader}
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        R
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={title}
                subheader={owner.firstName + " " + owner.lastName}
            />
            <CardMedia
                component="img"
                height="194"
                image={image?.url}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                    <FavoriteIcon className={likeClass}
                        onClick={handleFavoriteClick}
                    />
                    <span>{data?.likes_count}</span>
                </IconButton>
                <IconButton aria-label="share">
                    <ShareIcon />
                </IconButton>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>{postContentData?.text}</Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
}


