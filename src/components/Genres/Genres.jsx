import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { getGenresById } from '../../redux/reducer/getGenres'
import Modal from '../../modal/Modal'
import { getDetails } from '../../redux/reducer/getDetails'


function Genres() {
  const dispatch = useDispatch()
  const { genre } = useParams()
  const { genres } = useSelector(state => state.genres)
  const [openModal, setOpenModal] = useState(false);
  const {ids} = useSelector((state) => state.details);


  useEffect(() => {
    dispatch(getGenresById(genre))
  }, [genre, dispatch])

  const idModal = (id) => {
    setOpenModal(true);
    dispatch(getDetails(id));
  };

  return (
    <>
    <div className='popular'>
      {genres &&
        genres.map((item) => (
          <div className='popular__content' key={item.id} onClick={() => idModal(item.id)}>
            <img
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}`}
              alt='moviePhoto'
            />
            <p>{item.original_title}</p>
          </div>
        ))}
      {ids && (
        <Modal active={openModal} setActive={setOpenModal}>
          <div style={{ textAlign: 'center' }}>
            <img
              className='modal__img'
              src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${ids.backdrop_path}`}
              alt=''
            />
          </div>
          <strong style={{ marginRight: '20px' }}>{ids.title}</strong>
          <span>popularity: {Math.floor(ids.popularity)}</span>
          <p>{ids.overview}</p>
          <Link to={`/similar/${ids.id}`}>Similar</Link>
        </Modal>
      )}
    </div>
    </>
  )
}

export default Genres
