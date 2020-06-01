import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { Nav, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { MDBAnimation } from "mdbreact";
import MovieList from './components/MovieList';
import MovieInfo from './components/MovieInfo'

const APIKEY = process.env.REACT_APP_APIKEY;
const ERR_MSG = "Something wrong! Please try again later!";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      genres: [],
      arrMovie: [],
      originArrMovie: [],
      selectedMovie: "",
    }
  }

  componentDidMount = () => {
    this.getGenreList();
  }

  getMovies = async (url) => {
    try {
      let respone = await fetch(url);
      if (!respone.ok) throw ERR_MSG;

      let data = await respone.json();
      let movies = data.results.map((item) => {
        return {
          id: item.id,
          title: item.title,
          poster: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
          description: item.overview,
          date: item.release_date,
          rating: item.vote_average,
          ratingCount: item.vote_count,
          popularity: item.popularity,
          genres: item.genre_ids.map(movieGenreId => {
            let genre = this.state.genres.find(g => g.id === movieGenreId);
            return genre.name;
          })
        }
      });
      // console.log(data.results[0]);
      // console.log(movies[0]);
      // console.log(this.state.genres);

      this.setState({
        isReady: true,
        genres: this.state.genres,
        arrMovie: movies,
        originArrMovie: movies,
        selectedMovie: this.state.selectedMovie,
      });
    } catch (error) {
      alert(error);
    }
  }

  getGenreList = async () => {
    try {
      let genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKEY}&language=en-US`
      let respone = await fetch(genreUrl);
      if (!respone.ok) throw ERR_MSG;

      let data = await respone.json();
      this.setState({
        isReady: this.state.isReady,
        genres: data.genres,
        arrMovie: this.state.arrMovie,
        originArrMovie: this.state.originArrMovie,
        selectedMovie: this.state.selectedMovie,
      });

      let movieUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=en-US`
      this.getMovies(movieUrl);

    } catch (error) {
      alert(error);
    }
  }

  setSelectedMovie = (movieTitle) => {
    this.setState({
      isReady: this.state.isReady,
      genres: this.state.genres,
      arrMovie: this.state.arrMovie,
      originArrMovie: this.state.originArrMovie,
      selectedMovie: movieTitle,
    });
  }

  searchContents = "";
  filterMovie = () => {
    let filteredMovies = this.state.originArrMovie;
    let selectedName = "";

    if (this.searchContents.length > 0) {
      filteredMovies = filteredMovies.filter(
        m => m.title.toLowerCase().includes(this.searchContents.toLowerCase()));

      if (filteredMovies.length > 0) {
        selectedName = filteredMovies[0].title;
      }
    }

    this.setState({
      isReady: this.state.isReady,
      genres: this.state.genres,
      arrMovie: filteredMovies,
      originArrMovie: this.state.originArrMovie,
      selectedMovie: selectedName,
    });
  }

  currentAPIPage = 1;
  getMovieAtPage = (pageNo) => {
    this.currentAPIPage = pageNo;
    let movieUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=en-US&page=${pageNo}`
    this.getMovies(movieUrl);
  }

  getMovieAtNextPrev = (str) => {
    if (str === "+") {
      this.currentAPIPage++;
    } else if (str === "-") {
      this.currentAPIPage--;
    }

    let movieUrl = `https://api.themoviedb.org/3/movie/now_playing?api_key=${APIKEY}&language=en-US&page=${this.currentAPIPage}`
    this.getMovies(movieUrl);
  }

  getListName = (listName) => {
    let listMovieUrl = `https://api.themoviedb.org/3/movie/${listName}?api_key=${APIKEY}&language=en-US&page=1`
    this.getMovies(listMovieUrl);
  }


  ratingUp = true;
  popularityUp = true;
  sortMovie = (type) => {
    let filteredMovies = this.state.arrMovie;

    if (type === "rating") {
      this.ratingUp = !this.ratingUp;
      filteredMovies = filteredMovies.sort((a, b) => {
        if (this.ratingUp)
          return a.rating > b.rating ? 1 : -1;
        else
          return a.rating > b.rating ? -1 : 1;
      });
    } else if (type === "popularity") {
      this.popularityUp = !this.popularityUp;
      filteredMovies = filteredMovies.sort((a, b) => {
        if (this.popularityUp)
          return a.popularity > b.popularity ? 1 : -1;
        else
          return a.popularity > b.popularity ? -1 : 1;
      });
    }

    this.setState({
      isReady: this.state.isReady,
      genres: this.state.genres,
      arrMovie: filteredMovies,
      originArrMovie: this.state.originArrMovie,
      selectedMovie: this.state.selectedMovie,
    });
  }

  render() {
    let isReady = this.state.isReady;

    if (!isReady) {
      return (<h1>Loading</h1>);
    }

    return (
      <div className="my-color-primary">
        <Navbar variant="dark" className="my-color-primary">
          <Navbar.Brand href="#home">
            <MDBAnimation type="bounce" infinite>
              <img className="img-fluid nav-img" alt="" src="https://pbs.twimg.com/profile_images/1148484652358746112/UdJALHjZ_400x400.png" />
            </MDBAnimation>
          </Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home" onClick={() => this.getListName("now_playing")}>Home</Nav.Link>
            <Nav.Link href="#category">Category</Nav.Link>
            <Nav.Link href="#category" onClick={() => this.getListName("latest")}>Latest</Nav.Link>
            <Nav.Link href="#popular" onClick={() => this.getListName("popular")}>Popular</Nav.Link>
            <Nav.Link href="#toprated" onClick={() => this.getListName("top_rated")}>Top Rated</Nav.Link>
            <Nav.Link href="#upcoming" onClick={() => this.getListName("upcoming")}>Upcoming</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl
              onChange={e => { this.searchContents = e.target.value; }}
              type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info" onClick={() => this.filterMovie()}>Search</Button>
          </Form>
        </Navbar>

        <div className="react-body my-color-secondary">
          <MovieInfo selectedMovie={this.state.selectedMovie} movies={this.state.arrMovie}></MovieInfo>

          <div className="page-button-part">
            <div>
              <Button variant="info" className="page-button" onClick={() => this.sortMovie("rating")}>
                Rating
                {
                  this.ratingUp ?
                    <i className="fa fa-arrow-up" aria-hidden="true"></i>
                    :
                    <i className="fa fa-arrow-down" aria-hidden="true"></i>
                }
              </Button>
              <Button variant="info" className="page-button" onClick={() => this.sortMovie("popularity")}>
                Popularity
                {
                  this.popularityUp ?
                    <i className="fa fa-arrow-up" aria-hidden="true"></i>
                    :
                    <i className="fa fa-arrow-down" aria-hidden="true"></i>
                }
              </Button>
            </div>
            <div>
              {
                this.currentAPIPage > 1 ?
                  <Button className="page-button" onClick={() => this.getMovieAtNextPrev("-")}>
                    Prev
                </Button>
                  :
                  <Button className="page-button" disabled={true}>Prev</Button>
              }
              <Button className="page-button" onClick={() => this.getMovieAtPage(1)}>1</Button>
              <Button className="page-button" onClick={() => this.getMovieAtPage(2)}>2</Button>
              <Button className="page-button" onClick={() => this.getMovieAtPage(3)}>3</Button>
              <Button className="page-button" onClick={() => this.getMovieAtPage(4)}>4</Button>
              <Button className="page-button" onClick={() => this.getMovieAtPage(5)}>5</Button>
              {
                this.currentAPIPage < 5 ?
                  <Button className="page-button" onClick={() => this.getMovieAtNextPrev("+")}>
                    Next
                </Button>
                  :
                  <Button className="page-button" disabled={true}>Next</Button>
              }
            </div>
          </div>

          {/* <ReactModal isOpen={true} >
            <button onClick={() => closeModal()}>close</button>
            Hey this is modal!!
          </ReactModal> */}

          <MovieList onSelectMovie={this.setSelectedMovie} movieList={this.state.arrMovie.filter((m, i) => i < 10)}></MovieList>
          <MovieList onSelectMovie={this.setSelectedMovie} movieList={this.state.arrMovie.filter((m, i) => i > 9)}></MovieList>
        </div>

        <footer className="page-footer font-small my-color-primary">
          <div className="footer-copyright text-center py-3">© 2020 Copyright:
            <a href="https://github.com/khanhlinhle/"> khanhlinhle</a>
          </div>
        </footer>
      </div>
    )
  }
}
