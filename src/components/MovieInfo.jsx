import React, { Component } from 'react'
import { Carousel, Row, Card, Badge, Table } from "react-bootstrap";

import '../App.css';

export default class MovieInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastIndex: 0,
      lastSelected: "",
    }
  }

  onSelectedChange = (number, e) => {
    this.setState({
      lastIndex: number,
      lastSelected: this.state.lastSelected,
    });
  }

  renderRating = (score) => {
    let html = [];
    let yellows = Math.floor(score);
    let blacks = 10 - yellows;

    for (let index = 0; index < yellows; index++) {
      html.push(<span className="fa fa-star checked"></span>);
    }

    for (let index = 0; index < blacks; index++) {
      html.push(<span className="fa fa-star"></span>);
    }

    return html;
  }

  render() {
    let list = this.props.movies;

    if (this.props.selectedMovie !== this.state.lastSelected) {
      let index = list.findIndex(m => m.title === this.props.selectedMovie);

      if (index !== this.state.lastIndex && index > -1) {
        this.setState({
          lastIndex: index,
          lastSelected: this.props.selectedMovie
        })
      }
    }

    return (
      <Carousel
        className="movie-carousel"
        indicators={false}
        interval="5000"
        pause="hover"
        activeIndex={this.state.lastIndex}
        onSelect={this.onSelectedChange}
      >
        {list.map((item, i) => {
          return (
            <Carousel.Item key={i}>
              <div className="movie-container">
                <Row className="movie-card">
                  <Card bg="dark" className="movie-poster">
                    <img src={item.poster} alt={item.title}></img>
                  </Card>
                  <Card bg="dark" className="movie-info">
                    <Card.Header>
                      <Card.Title className="movie-title">
                        <h2>
                          {item.title}
                        </h2>
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Table striped bordered variant="dark">
                        <tbody>
                          <tr>
                            <td>Popularity:</td>
                            <td>{item.popularity}</td>
                          </tr>
                          <tr>
                            <td>Rating:</td>
                            <td>{this.renderRating(item.rating)}</td>
                          </tr>
                          <tr>
                            <td>Release date:</td>
                            <td>{item.date}</td>
                          </tr>
                          <tr>
                            <td colSpan="2">
                              {
                                item.genres.map((g, gi) => {
                                  return (
                                    <Badge key={gi} variant="success" className="movie-genre">
                                      {g}
                                    </Badge>
                                  )
                                })
                              }
                            </td>
                          </tr>
                        </tbody>
                      </Table>
                      <Card.Text className="movie-description">
                        {item.description}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Row>
              </div>
            </Carousel.Item>
          )
        })}
      </Carousel>
    )
  }
}
