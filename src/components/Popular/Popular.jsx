import React from 'react';
import { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPages } from '../../redux/reducer/getPopular';
import { getDetails, getSimilar} from '../../redux/reducer/getDetails';
import Modal from '../../modal/Modal';
import './popular.scss';
import { Link } from 'react-router-dom';

const Popular = memo(function Popular() {
  const dispatch = useDispatch();
  const {movies, status} = useSelector((state) => state.popular);
  const {ids} = useSelector((state) => state.details);
  const [openModal, setOpenModal] = useState(false);
  // const { images } = useSelector(state => state.details)


  const arr = [1,2,3,4,5,6,7,8,9,10]


  useEffect(() => {
    dispatch(getPages());
  }, [dispatch]);


  const idModal = (id) => {
    setOpenModal(true);
    dispatch(getDetails(id));
    dispatch(getSimilar(id))
  };

  if (status === 'pending') {
    return <h2>Loading...</h2>;
  }

  const mapMovies = movies.length &&
  movies.map((item) => (
    <div className='popular__content' key={item.id} onClick={() => idModal(item.id)}>
      <img
        src={`https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}`}
        alt='moviePhoto'
      />
      <p>{item.original_title}</p>
    </div>
  ))

  const pages = arr.map(div => <div
    onClick={() => {
      dispatch(getPages(div))
    }} 
    style={{width: '16px', heigth: '16px', border: '1px solid #000', textAlign: 'center'}}
    key={div}>
      {div}
    </div>)

  return (
    <>
    <div className='popular'>
      {
        mapMovies
      }
      {ids && (
        <Modal active={openModal} setActive={setOpenModal}>
          <div 
            style={{ textAlign: 'center' }}>
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
      <div style={{display: 'flex', justifyContent: 'center', gap: '10px', margin: '50px 0'}}>
      {pages}
      </div>
    </>
  );
});

export default Popular;
