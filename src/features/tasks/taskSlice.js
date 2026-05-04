import { createSlice } from '@reduxjs/toolkit';
import { getTasksFromLocalStorage } from '../../utils/storage';

//taskSlice
const initialState = {
  tasks: getTasksFromLocalStorage()
 

};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
    reducers: { 
    addTask: (state, action) => {
      console.log("payload " ,action.payload);
      console.log("new task added");
       
      
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },

    editTask:(state , action) => {
      console.log("edit task slice" , action.payload);
      
      state.tasks = state.tasks.map(task => (
        //edit task with matching id, otherwise return the same task
        

        task.id === action.payload.id ? {  ...action.payload } : task
      ) )},
    
      updateTaskStatus :(state,action) =>{
        const {id , status} = action.payload;

        state.tasks = state.tasks.map(task => (
          task.id === id ? {...task , status: status} : task
        ))
          console.log("update task status" , id , status);
      }

    
}
});

//fix export error in TaskForm.jsx

export const { addTask, deleteTask , editTask, updateTaskStatus} = taskSlice.actions;
export default taskSlice.reducer;