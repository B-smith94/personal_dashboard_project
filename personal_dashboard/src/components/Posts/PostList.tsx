import { useMutation } from "@apollo/client";
import { DELETE_POST } from "../../queries/Mutations";
import { getPosts } from "../../hooks/usePosts";
import { Container, Card, Button, ListGroup } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const PostList = () => {
    const { id } = useParams();
    const { loading, error, data, refetch } = getPosts(String(id));
    const [ deletePost ] = useMutation(DELETE_POST);
    const navigate = useNavigate();


    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await deletePost({ variables: { id }});
                refetch();
                console.log('Deletion successful.')
            } catch (error) {
                console.error("Error deleting post:", error)
            }
        };    
    }

    return (
        <Container>
            <h1>Posts</h1>
            <Button variant="primary" onClick={() => navigate(`/create-post/${id}`)}>
                Make a New Post
            </Button>
            {data.user.posts.data.map((post: any) => (
                <Card key={post.id}>
                    <Card.Header>
                        <Card.Title>Post #{post.id} - {post.title}</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>{post.body}</Card.Text>
                        <Button variant="info" onClick={() => navigate(`/update-post/${post.id}`)}>Edit Post</Button>
                        <Button variant="danger" onClick={() => handleDelete(post.id)}>Delete Post</Button>
                    </Card.Body>
                    <Card.Footer>Comments: {post.comments.data.map((comment: any) => (
                        <ListGroup key={comment.id}>
                            <ListGroup.Item className="fw-bold">{comment.name}</ListGroup.Item>
                            <ListGroup.Item>{comment.body}</ListGroup.Item>
                        </ListGroup>
                    ))}</Card.Footer>
                </Card>
            ))}
        </Container>
    )
}

export default PostList;

