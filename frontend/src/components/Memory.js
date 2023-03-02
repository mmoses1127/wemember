import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getMemory, fetchMemory, deleteMemory } from "../store/memories";

const Memory = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const {memoryId} = useParams()
  const memory = useSelector(getMemory(memoryId));

  useEffect(() => {
    dispatch(fetchMemory(memoryId));
  }, [dispatch, memoryId]);

  const handleUpdate = (e) => {
    e.preventDefault();
    history.push(`/memories/${memoryId}/edit`);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteMemory(memoryId));
    history.push('/');
  };

  return (
    <div>
      <h1>{memory.title}</h1>
      <ul>
        <li>{memory.date}</li>
        <li>{memory.description}</li>
        <li>{memory.authorId}</li>
        <button onClick={handleUpdate}>Update Memory</button>
        <button onClick={handleDelete}>Delete Memory</button>
      </ul>
    </div>
  )

};

export default Memory;