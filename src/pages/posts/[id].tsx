import {NextPage} from "next";
import {useRouter} from "next/router"
const EventPage: NextPage = () => {
    const{query} = useRouter()
    return (
            <h1>EventPage with id {query.id}</h1>
    )
}

export default EventPage;