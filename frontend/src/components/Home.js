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
    <div className="flex flex-col items-center justify-center bg-slate-600 w-1/2 h-1/2 rounded-lg p-5">
      <h1 className="text-blue-500 font-bold text-5xl pb-5">Home</h1>
      <div className="">
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