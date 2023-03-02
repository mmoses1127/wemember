import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getMemories, fetchMemories } from "../store/memories";


const Home = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const memories = useSelector(getMemories);

  useEffect(() => {
    dispatch(fetchMemories());
  }, [dispatch])

  return (
    <div>
      <h1>Home</h1>
      <div>
        <ul>Memories
        {
          memories && memories.map(memory => 
          <div>
            <li>{memory.title}</li>
            <li>{memory.authod_id}</li>
            <li>{memory.date}</li>
            <li>{memory.description}</li>
          </div>
        )}
        </ul>
      </div>
    </div>
  )
}

export default Home;