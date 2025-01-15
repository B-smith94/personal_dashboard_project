import { useMutation, useQuery } from "@apollo/client";
import { UPDATE_POST } from "../../queries/Mutations";
import { GET_POST } from "../../queries/Queries";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container } from 'react-bootstrap'
import { useRef, FormEvent, useEffect } from "react";

const UpdatePost: React.FC = () => {
    const inputBody = useRef<HTMLTextAreaElement>(null);
    const { id } = useParams();
    const [updatePost, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_POST, {
        variables: { id, }
    })
    const {data, loading, error } = useQuery(GET_POST, {
        variables: { id }
    }) 
    const navigate = useNavigate();
    
    useEffect(() => {
        if (data && data.post && inputBody.current) {
            inputBody.current.value = data.post.body;
        }
    }, [data])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (inputBody.current) {
            updatePost({
                variables: {
                    id,
                    input:  {body: inputBody.current.value },
                },
            });
            inputBody.current.value = '';
            console.log('Update successful!')
            navigate('/');
        }
    };

    if (loading) return <p>Loading post data...</p>
    if (error) return <p>Error fetching post: {error.message}</p>
    if (updateError) return <p>Error updating post: {updateError.message}</p>

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <h1>Update Post</h1>
                <Form.Group controlId="formBody">
                    <Form.Label>Body</Form.Label>
                    <Form.Control
                     as='textarea'
                     placeholder='Enter post body'
                     rows={3}
                     ref={inputBody}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">{updateLoading? "Updating..." : "Update Post"}</Button>
            </Form>
        </Container>
    )
}

export default UpdatePost