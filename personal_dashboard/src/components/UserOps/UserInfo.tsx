import { GET_USER_INFO } from "../../queries/Queries";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Button, Card, ListGroup, Container } from "react-bootstrap";

const UserInfo = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_USER_INFO, {
        variables: { id }
    })

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    return (
        <Container>
            <h1>User Profile</h1>
            <Card>
                <Card.Header>
                    <Card.Title>User Information</Card.Title>
                </Card.Header>
                <Card.Body>
                    <Card.Text>Name: {data.user.name}</Card.Text>
                    <Card.Text>Username: {data.user.username}</Card.Text>
                    <Card.Text>Email: {data.user.email}</Card.Text>
                    <Card.Text>Phone: {data.user.phone}</Card.Text>
                    <Card.Text>Website: <a href={data.user.website}>{data.user.website}</a></Card.Text>
                    <Card.Text>Address: {data.user.address.suite} {data.user.address.street} {data.user.address.city} {data.user.address.zipcode}
                    </Card.Text>
                    <Card.Text>Company: 
                        <ListGroup>
                            <ListGroup.Item>Name: {data.user.company.name}</ListGroup.Item>
                            <ListGroup.Item>{data.user.company.catchPhrase}</ListGroup.Item>
                            <ListGroup.Item>Business Strategy: {data.user.company.bs}</ListGroup.Item>
                        </ListGroup>
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <Button variant="primary" onClick={() => navigate(`/post-list/${id}`)}>View Posts</Button>
                </Card.Footer>
            </Card>
        </Container>
    )
}

export default UserInfo;