import React, {useEffect, useState} from 'react'
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { getDetails, getSimilar} from '../../redux/reducer/getDetails';
import Modal from '../../modal/Modal';

function Similar() {
  const dispatch = useDispatch();
  const {status} = useSelector((state) => state.popular);
  const {ids} = useSelector((state) => state.details);
  const [openModal, setOpenModal] = useState(false);
  const movies = useSelector(state => state.details.similar)
  const {id} = useParams()

  const idModal = (id) => {
    setOpenModal(true);
    dispatch(getDetails(id));
  };

  useEffect(() => {
    dispatch(getSimilar(id))
  }, [id, dispatch])

  if (status === 'pending') {
    return <h2>Loading...</h2>;
  }

  const mapMovies = movies &&
  movies.results.map((item) => (
    <div className='popular__content' key={item.id} onClick={() => idModal(item.id)}>
      <img
        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}`}
        alt='moviePhoto'
      />
      <p>{item.original_title}</p>
    </div>
  ))


  return (
    <div className='popular'>
      {
        mapMovies
      }
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
  )
}

export default Similar
