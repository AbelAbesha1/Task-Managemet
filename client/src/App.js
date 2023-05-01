import { useEffect, useState } from "react";
import ListHeader from "./components/ListHeader";
import ListItem from "./components/ListItem";

import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min.js';
import Auth from "./components/Auth";
import {useCookies} from 'react-cookie'
const App = ({deleteData}) => {
  const [Cookie, setCookie , removeCookie] = useCookies(null)
  const authToken=Cookie.AuthToken
 

  const userEmail = Cookie.Email;
  const [tasks, setTasks] = useState(null);

  const getData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks/${userEmail}`);
      const json = await response.json();
      setTasks(json);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authToken) {
      getData();
    }
  }, []); // run only once on component mount

  // sort by date
  const sortedTasks = tasks?.sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="App">
    {!authToken && <Auth/>}
    { authToken && <>
      <ListHeader ListName={"TASK LIST"} getData={getData} />
      <p className="user-email">Welcome Back {userEmail}</p>
      {sortedTasks?.map((task) => (
      <ListItem key={task.id} task={task} getData={getData} deleteData={deleteData} />
      ))} 
      </>}
    </div>
  );
};

export default App;
