import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCurrentUser } from "../store/session";
import { createMemory } from "../store/memories";

const NewMemory = () => {

  const history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState('');
  const userId = useSelector(getCurrentUser).id;
  console.log(userId)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMemory = {
      title,
      date,
      description,
      author_id: userId
    };
    let mem = await dispatch(createMemory(newMemory));
    if (mem) {
      history.push('/');
    } else {
      alert('Memory not created');
    }
  };

  const redirectHome = (e) => {
    e.preventDefault();
    history.push('/');
  };


  return (
    <div>
      <h1>New Memory</h1>
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
        <button>Create Memory</button>
        <button onClick={redirectHome} >Cancel</button>
      </form>
    </div>
  )

};

export default NewMemory;