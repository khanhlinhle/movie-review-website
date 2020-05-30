import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import {
  Container, Nav, Navbar, Form, FormControl, Button, Carousel,
  Row, Col, ListGroup, ListGroupItem
} from "react-bootstrap";
import { MDBAnimation } from "mdbreact";

import MovieCards from './components/MovieCards';
import MovieInfo from './components/MovieInfo'

const APIKEY = process.env.REACT_APP_APIKEY;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      arrMovie: [],
    }
  }

  componentDidMount = () => {
    this.getMovies();
  }

  //   `https://api.themoviedb.org/3/movie/${idvalue}/videos?api_key=${api}&language=en-US`

  getMovies = async (pageNo) => {

    let url = `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=en-US&page=${pageNo}`

    let respone = await fetch(url);
    let data = await respone.json();
    let movies = data.results.map((item) => {
      return {
        title: item.title,
        poster: `https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`,
        description: item.overview,
        date: item.release_date,
        rating: item.vote_average,
        genre: item.genre_ids,
      }
    });

    console.log(data.results[0]);
    this.setState({
      isReady: true,
      arrMovie: movies
    });


  }

  // getGenreList = async () => {
  //   let url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}&language=en-US`
  //   let respone = await fetch(url);
  //   let data = await respone.json();
  //   this.getMovies();
  // }

  render() {
    let isReady = this.state.isReady;

    if (!isReady) {
      return (<h1>Loading</h1>);
    }

    let movies = this.state.arrMovie;

    return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">
            <MDBAnimation type="bounce" infinite>
              <img className="img-fluid nav-img" alt="" src="https://pbs.twimg.com/profile_images/1148484652358746112/UdJALHjZ_400x400.png" />
            </MDBAnimation>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#category">Category</Nav.Link>
            <Nav.Link href="#category">Latest</Nav.Link>
            <Nav.Link href="#popular">Popular</Nav.Link>
            <Nav.Link href="#toprated">Top Rated</Nav.Link>
            <Nav.Link href="#upcoming">Upcoming</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Navbar>

        <MovieInfo movie={this.state.arrMovie[0]}></MovieInfo>

        <Carousel>
          {movies.map((item, i) => {
            return (
              <Carousel.Item key={i}>
                <Container>
                  <Row>
                    <Col md={{ span: 4, offset: 2 }}>
                      <img src={item.poster}></img>
                    </Col>
                    <Col md={{ span: 4 }}>
                      Release date: {item.date}
                      Rating: {item.rating}

                    </Col>
                  </Row>
                </Container>
              </Carousel.Item>
            )
          })}
        </Carousel>

        {/* <MovieCards movieList={this.state.arrMovie}></MovieCards> */}

        <div className="button-part">
          <Button className="page-button" onClick={() => this.getMovies(1)}>1</Button>
          <Button className="page-button" onClick={() => this.getMovies(2)}>2</Button>
          <Button className="page-button" onClick={() => this.getMovies(3)}>3</Button>
          <Button className="page-button" onClick={() => this.getMovies(4)}>4</Button>
          <Button className="page-button" onClick={() => this.getMovies(5)}>5</Button>
        </div>

        <footer className="page-footer font-small black">
          <div className="footer-copyright text-center py-3">© 2020 Copyright:
            <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
          </div>
        </footer>
      </div>
    )
  }
}
