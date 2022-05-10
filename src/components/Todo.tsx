import { useAppDispatch } from "../hooks/redux-hooks";
import { useAppselector } from "../hooks/redux-hooks";

import { fetchTodos } from "../store/todo-actions";

import { fetchParticularTodo } from "../store/todo-actions";

import { useState } from "react";

import "./Todo.css";

// import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
// import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Todo = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [todo_id, setTodo_id] = useState(1);
  const dispatch = useAppDispatch();
  const alltodos = useAppselector((state) => state.todo.all_todos);
  const particularTodo = useAppselector((state) => state.todo.particular_todo);
  const clickHandler = () => [dispatch(fetchTodos())];
  const searchHandler = () => {
    dispatch(fetchParticularTodo(todo_id));
  };
  const checkTodo = (): boolean => {
    if (alltodos.length === 0) {
      return false;
    }
    return true;
  };

  const checkparticularTodo = (): boolean => {
    if (particularTodo.id === 0) {
      return false;
    }
    return true;
  };
  return (
    <>
      

      <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Search Task" {...a11yProps(0)} />
          <Tab label="List All Tasks" {...a11yProps(1)} /> 
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
      <div>
        <label>Enter the Task number [1-30] : </label>
        <input
          onChange={(event) => {
            setTodo_id(parseInt(event.target.value));
          }}
          type="number"
        ></input>

        <button onClick={searchHandler}> Find </button>
        <div>
          {/* <h3>Particular TODO</h3> */}
          {checkparticularTodo() && (
            <div className="todo-container" key={particularTodo.id}>
              <p className="todo-child1"> Task No. : {particularTodo.id}</p>
              <p className="todo-child2">User Id :{particularTodo.userId}</p>
              <p className="todo-child3">Task details : {particularTodo.todo}</p>
            </div>
          )}
        </div>
      </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <div>
        <button onClick={clickHandler}> List All Tasks</button>

        <div>
          {/* <div className="todo-container">
                    <p className="todo-child1">ID</p>
                    <p className="todo-child2">USER ID</p>
                    <p className="todo-child3">TITLE</p>
          </div> */}
          {checkTodo() &&
            alltodos.map((todo) => (
              <div className="todo-container" key={todo.id}>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography>
                      #{todo.id} - {todo.todo}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <span className="todo-child2">
                        {" "}
                        Added by User ID : {todo.userId}
                      </span>
                    </Typography>
                  </AccordionDetails>
                </Accordion>

                {/* <p className="todo-child3"></p> */}
              </div>
            ))}
        </div>
      </div>
      </TabPanel>
       
    </Box>
      
    </>
  );
};
export default Todo;
