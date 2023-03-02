import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getCurrentUser } from "../store/session";
import { updateMemory, getMemory, fetchMemory } from "../store/memories";

const UpdateMemory = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const userId = useSelector(getCurrentUser).id;
  const {memoryId} = useParams();
  const memory = useSelector(getMemory(memoryId))
  const [title, setTitle] = useState(memory?.title);
  const [date, setDate] = useState(memory?.date);
  const [description, setDescription] = useState(memory?.description);


  useEffect(() => {
    dispatch(fetchMemory(memoryId));
  }, [dispatch])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedMemory = {
      title,
      date,
      description,
      id: memoryId,
    };
    let mem = await dispatch(updateMemory(updatedMemory));
    if (mem) {
      history.push('/');
    } else {
      alert('Memory not updated');
    }
  };

  const redirectHome = (e) => {
    e.preventDefault();
    history.push('/');
  };


  return (
    <div>
      <h1>Update Memory</h1>
      <form onSubmit={handleSubmit}>
        <label> Title
          <input type='text' value={title} onChange={e => setTitle(e.target.value)} />
        </label>
        <label> Date
          <input type='date' value={date} onChange={e => setDate(e.target.value)} />
        </label>
        <label> Description
          <input type='text' value={description} onChange={e => setDescription(e.target.value)} />
        </label>
        <button>Update Memory</button>
        <button onClick={redirectHome} >Cancel</button>
      </form>
    </div>
  )

};

export default UpdateMemory;