import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getMemories, fetchMemories } from "../store/memories";
import { Link } from "react-router-dom";


const Home = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const memories = useSelector(getMemories);

  useEffect(() => {
    dispatch(fetchMemories());
  }, [dispatch])

  const handleNew = (e) => {
    e.preventDefault();
    history.push('/new');
  };


  return (
    <div>
      <h1>Home</h1>
      <div>
        <ul>Memories
        {
          memories && memories.map(memory => 
          <div>
            <li>{memory.title}</li>
            <li>{memory.authorId}</li>
            <li>{memory.date}</li>
            <li>{memory.description}</li>
            <Link to={`/memories/${memory.id}`}>View Memory</Link>
          </div>
        )}
        </ul>
      </div>
      <button onClick={handleNew} >New Memory</button>
    </div>
  )
}

export default Home;