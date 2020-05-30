import React, { Component } from 'react'
import { CardDeck, Card, ListGroupItem, ListGroup } from "react-bootstrap";

import '../App.css';

export default class MovieCards extends Component {

    render() {
        let movies = this.props.movieList;
        return (
            <CardDeck className="movie-list">
                {movies.map((item, i) => {
                    return (
                        <Card key={i} className="movie-card">
                            <Card.Img
                                variant="top"
                                src={item.poster}
                            />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>{item.description}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroupItem> Release date: {item.date}</ListGroupItem>
                                <ListGroupItem>Rating: {item.rating}</ListGroupItem>
                            </ListGroup>
                        </Card>
                    )
                })}
            </CardDeck>
        )
    }
}
