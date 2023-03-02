const ADD_MEMORIES = 'ADD_MEMORIES';
const ADD_MEMORY = 'ADD_MEMORY';
const REMOVE_MEMORY = 'REMOVE_MEMORY';

export const addMemories = (memories) => {
  return ({
    type: ADD_MEMORIES,
    memories
  });
};

export const addMemory = (memory) => {
  return ({
    type: ADD_MEMORY,
    memory
  });
};

export const removeMemory = (memoryId) => {
  return ({
    type: REMOVE_MEMORY,
    memoryId
  });
};

export const getMemories = (state = {}) => {
  if (state.memories) {
    return Object.values(state.memories);
  } else {
    return null;
  }
};

export const getMemory = (state = {}, memoryId) => {
  if (state.memories) {
    return state.memories[memoryId];
  } else {
    return null;
  }
};

export const fetchMemories = () => async dispatch => {
  let res = await fetch('/api/memories');
  if (res.ok) {
    let data = await res.json();
    dispatch(addMemories(data));
  } else {
    console.log('error fetching memories');
  }
};

export const fetchMemory = (memoryId) => async dispatch => {
  let res = await fetch(`/api/memories/${memoryId}`);
  if (res.ok) {
    let data = await res.json();
    dispatch(addMemory(data));
  } else {
    console.log('error fetching memory');
  }
};

export const updateMemory = (memory) => async dispatch => {
  let res = await fetch(`/api/memories/${memory.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(memory)
  });
  if (res.ok) {
    let data = await res.json();
    dispatch(addMemory(data));
  } else {
    console.log('error updating memory');
  }
};

export const deleteMemory = (memoryId) => async dispatch => {
  let res = await fetch(`/api/memories/${memoryId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    dispatch(removeMemory(memoryId));
  } else {
    console.log('error deleting memory');
  }
};




const memoriesReducer = (state = {}, action) => {
  let newState = {...state};
  switch (action.type) {
    case ADD_MEMORIES:
      newState = action.memories;
      return newState;
    case ADD_MEMORY:
      newState[action.memory.id] = action.memory;
      return newState;
    case REMOVE_MEMORY:
      delete newState[action.memoryId];
      return newState;
    default:
      return state;
  }
};

export default memoriesReducer;