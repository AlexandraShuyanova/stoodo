import {NextPage} from "next";
import {Layout} from "@/components/Layout/Layout";
import {getPostBySlug, getPostContentBySlug, getRunningQueriesThunk} from "../../services/StoodoService";
import {Post} from "@/components/screens/Post/Post";
import {wrapper} from "../../store/store";
const PostPage: NextPage = () => {

    return (
            <Layout>
                <Post/>
            </Layout>
    )
}

export default PostPage;

export const getServerSideProps = wrapper.getServerSideProps(
    (store) => async (context) => {
        const slug = context.params?.slug;
        if (typeof slug === "string") {
            store.dispatch(getPostContentBySlug.initiate(slug))
        }

        await Promise.all(store.dispatch(getRunningQueriesThunk()));

        return {
            props: {},
        };
    }
);
