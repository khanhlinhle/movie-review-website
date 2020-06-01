import React, { Component } from 'react'
import ReactModal from 'react-modal';
import { Button } from "react-bootstrap";
import YouTube from '@u-wave/react-youtube';
import '../App.css';


const APIKEY = process.env.REACT_APP_APIKEY;
const ERR_MSG = "Something wrong! Please try again later!";
export default class TrailerShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      videoId: "",
    }
  }

  closeModal = () => {
    this.setState({
      openModal: false
    })
  }
  

  openModal = () => {
    this.setState({
      openModal: true
    })
    this.getTrailerMovies(this.props.movie.id)
  }
  
  getTrailerMovies = async (movieId) => {
    try {
      let trailerUrl = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${APIKEY}&language=en-US`
      let respone = await fetch(trailerUrl);
      if (!respone.ok) throw ERR_MSG;
      let data = await respone.json();
      console.log("Trailer list", data)

      this.setState({
        videoId: data.results[0].key
      });
    } catch (error) {
      alert(error);
    }
  }
  render() {
    return (
      <div>
        <Button variant="primary" onClick={() => this.openModal()}>
          Trailer</Button>
        <ReactModal isOpen={this.state.openModal}>
        <div className="container-text">
          <YouTube className="container-text" video={this.state.videoId} autoplay/>
        </div>
        <Button onClick={() => this.closeModal()}>Close</Button>
        </ReactModal>
      </div>
    )
  }
}
