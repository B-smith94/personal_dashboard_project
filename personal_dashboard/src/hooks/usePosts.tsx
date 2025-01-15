import { useQuery } from "@apollo/client";
import { GET_USER_POSTS, GET_POST } from "../queries/Queries";

export const getPosts = () => {
    const { loading, error, data, refetch } = useQuery(GET_USER_POSTS);
    return { loading, error, data, refetch };
}

export const getPost = (id: string) => {
    const { loading, error, data } = useQuery(GET_POST, {
        variables: { id }
    });
    return { loading, error, data }
}