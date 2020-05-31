import React, { Component } from 'react'
import { Row, Col, Button } from "react-bootstrap";

import '../App.css';

export default class MovieList extends Component {

  selectMovie(movieTitle) {
    this.props.onSelectMovie(movieTitle);
  }

  render() {
    let movies = this.props.movieList;
    return (
      <Row className="movie-list">
        {movies.map((item, i) => {
          return (
            <Col key={i} className="movie-list-item">
              <Button
                variant="dark"
                onClick={() => this.selectMovie(item.title)}>
                <img
                  variant="top"
                  src={item.poster}
                  alt={item.title}
                  className="movie-list-item-img"
                />
              </Button>
            </Col>
          )
        })}
      </Row>
    )
  }
}
