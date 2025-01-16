import { GET_USER_ALBUMS } from "../../queries/Queries";
import { useQuery } from "@apollo/client";
import { Container, Card, Button, Col, Row, Form} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import NavBar from "../NavBar";

const ViewAlbums = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState<string>('');

    useEffect(():void => {
        if (id === 'undefined') {
            navigate('/');
        };
    }, [])

    const { loading, error, data } = useQuery(GET_USER_ALBUMS, {
        variables: { id }
    })
    const [toggledAlbums, setToggledAlbums] = useState<{ [key: string]: boolean}>({});

    const handleToggle = (albumId: string) => {
        setToggledAlbums((prevState) => ({
            ...prevState,
            [albumId]: !prevState[albumId],
        }));
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error.message}</p>

    const filteredAlbums = data?.user?.albums?.data.filter((album: any) => 
        searchQuery ? album.title.toLowerCase().includes(searchQuery.toLowerCase()) : data.user.albums.data
    )

    return (
        <Container>
            <NavBar />
            <h1>Photo Albums</h1>
            <Button className="m-1" onClick={() => navigate(`/user-profile/${id}`)}>View Profile</Button>
            <Button className="m-1" onClick={() => navigate(`/post-list/${id}`)}>View Posts</Button>
            <Form.Group>
                <Form.Label>Search Albums by Title</Form.Label>
                <Form.Control
                 type="text"
                 placeholder="Search Albums by Title"
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Form.Group>
            <Row>
               {filteredAlbums.map((album: any) => (
                    <Col key={album.id}>
                        <Card style={{ width: '23rem'}}>
                            <Card.Header>
                                <Card.Title>{album.title}</Card.Title>
                                <Button onClick={() => handleToggle(album.id)}>{toggledAlbums[album.id] ? "Hide photos" : "View Photos"}</Button>
                            </Card.Header>
                            {toggledAlbums[album.id] && album.photos.data.map((photo: any) => (
                                <Card.Body key={photo.id} style={{ width: '18rem' }}>
                                    <Card.Text>{photo.title}</Card.Text>
                                    <Card.Img src={photo.thumbnailUrl}/> 
                                </Card.Body>  
                            ))}
                        </Card>
                    </Col> 
                ))} 
            </Row>
        </Container>
    )
}

export default ViewAlbums;