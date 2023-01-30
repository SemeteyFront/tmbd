import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom'
import RightModal from '../../modal/RigthModal';
import { getGenresList } from '../../redux/reducer/getGenres';
import './header.scss';

function Header() {
  const dispatch = useDispatch()
  const { genresList } = useSelector(state => state.genres)
  const [isOpenModal, setIsOpenModal] = useState(false)


  const openModal = () => {
    setIsOpenModal(true)
    dispatch(getGenresList ())
  }

  const mapGenres = genresList && 
  genresList.map(genre => <p key={genre.id}><Link to={`/genres/${genre.id}`}>{genre.name}</Link></p>)

  return (
    <>
      <header>
        <Link to={'/'}>Movies</Link>
        <button className='close-btn' onClick={openModal}>Genres</button>
        <Link to={'/courses'}>Courses</Link>
      </header>
      <RightModal 
        active={isOpenModal} 
        setActive={setIsOpenModal}
      >
        <div className='header__modal'>
        {
          mapGenres
        }
        </div>
      </RightModal>
      <Outlet/>
    </>
  )
}

export default Header;
