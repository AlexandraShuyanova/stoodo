import {NextPage} from "next";
import {useRouter} from "next/router"
import {Layout} from "@/components/Layout/Layout";
import {useGetPostBySlugQuery} from "../../services/StoodoService";
import {PostItem} from "@/components/PostItem/PostItem";
import {Post} from "@/components/screens/Post/Post";
const PostPage: NextPage = () => {

    return (
            <Layout>
                <Post/>
            </Layout>
    )
}

export default PostPage;