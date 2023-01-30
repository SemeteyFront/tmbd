import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCourses } from '../../redux/reducer/getCourses'

function Courses() {
  const dispatch = useDispatch()
  const { courses } = useSelector(state => state.courses)
  console.log(courses);

  useEffect(() => {
    dispatch(getCourses())
  }, [dispatch])
  return (
    <div>
      <button>R Y</button>
    </div>
  )
}

export default Courses
