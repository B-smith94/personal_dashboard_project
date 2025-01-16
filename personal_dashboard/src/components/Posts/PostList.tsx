import { useMutation } from "@apollo/client";
import { DELETE_POST } from "../../queries/Mutations";
import { getPosts } from "../../hooks/usePosts";
import { Container, Card, Button, ListGroup, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import NavBar from "../NavBar";

const PostList = () => {
    const { id } = useParams();
    const { loading, error, data, refetch } = getPosts(String(id));
    const [ deletePost ] = useMutation(DELETE_POST);
    const navigate = useNavigate();
    const [posts, setPosts] = useState([])
    const [searchQuery, setSearchQuery] = useState<string>('')

    useEffect(():void => {
        if (id === 'undefined') {
            navigate('/');
        };
        
    }, [])

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>
    
    useEffect(() => {
        if (data?.user?.posts?.data) {
            setPosts(data.user.posts.data)
        }
    }, [])
    
    
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
    
    const filteredPosts = posts.filter((post: any) => 
        searchQuery ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) : posts
    )

    return (
        <Container>
            <NavBar />
            <h1>Posts</h1>
            <Button variant="primary" onClick={() => navigate(`/create-post/${id}`)}>
                Make a New Post
            </Button>
            <Button variant="info" onClick={() => navigate(`/user-profile/${id}`)}>View Profile</Button>
            <Button variant="secondary" onClick={() => navigate(`/todos/${id}`)}>View Todo List</Button>
            <Form.Group controlId="searchPosts">
                <Form.Label>Search Posts</Form.Label>
                <Form.Control
                 type="text"
                 placeholder="Search posts by title"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Form.Group>
            {filteredPosts.map((post: any) => (
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

