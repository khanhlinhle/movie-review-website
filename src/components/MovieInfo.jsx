import React, { Component } from 'react'
import { Container } from "react-bootstrap";

import '../App.css';

export default class MovieInfo extends Component {

    render() {
        let item = this.props.movie;
        return (
            // <Card className="movie-info">
            //     <Card.Img variant="left" src={item.poster} />
            //     <Card.Body variant="right">
            //         <Card.Title>{item.title}</Card.Title>
            //         <Card.Text>{item.description}
            //         </Card.Text>
            //     </Card.Body>
            //     <ListGroup className="list-group-flush">
            //         <ListGroupItem> Release date: {item.date}</ListGroupItem>
            //         <ListGroupItem>Rating: {item.rating}</ListGroupItem>
            //     </ListGroup>
            // </Card>

            <Container>
                <div>
                    
                </div>
            </Container>
        )
    }
}
