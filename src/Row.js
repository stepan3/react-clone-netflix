import React, { useState, useEffect } from 'react'
import YouTube from 'react-youtube'
import axios from './axios'
import './Row.css'

const base_url = 'https://image.tmdb.org/t/p/original/'

function Row({ title, fetchURL, isLargeRow }) {
  const [movies, setMovies] = useState([])
  const [trailerURL, setTrailerURL] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(fetchURL)
      setMovies(request.data.results)
      return request
    }
    fetchData()
  }, [fetchURL])

  // console.log(movies)

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1
    }
  }

  const handleClick = async movie => {
    if (trailerURL) {
      setTrailerURL('')
    } else {
      let trailerurl = await axios.get(
        `/movie/${movie.id}/videos?api_key=ca08c707f8ee0d336c698bfeececfecb`
      )
      setTrailerURL(trailerurl.data.results[0]?.key)
    }
  }

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map(
          movie =>
            movie.backdrop_path !== null && (
              <img
                key={movie.id}
                onClick={() => handleClick(movie)}
                className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                src={`${base_url}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
            )
        )}
      </div>
      {trailerURL && <YouTube videoId={trailerURL} opts={opts} />}
    </div>
  )
}

export default Row
