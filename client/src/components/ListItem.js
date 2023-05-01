import React, { useState } from "react";
import ProgressBar from "./ProgressBar";
import TickIcon from "./TickIcon";
import Modal from "./Modal";

const ListItem = ({ task, getData }) => {
  const [showModal, setshowModal] = useState(false);
  const deleteData = async () => {
    
    try {
      const response = await fetch(
        `http://localhost:5000/tasks/${task.id}`,
        {
          method: "DELETE"
        }
      );
      if (response.status === 200) {
        console.log("task deleted");
        getData();
        setshowModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <li className="list-item">
      <div className="info-container">
        <TickIcon />
        <p className="task-title">{task.title}</p>
        <ProgressBar progress={task.progress} />
      </div>
      <div className="button-container">
        <button className="edit" onClick={() => setshowModal(true)}>
          EDIT
        </button>
        <button className="delete" onClick={deleteData}>DELETE</button>
      </div>
      {showModal && <Modal mode={"edit"} setshowModal={setshowModal} 
      task = {task}
      getData={getData}/>}
    </li>
  );
};

export default ListItem;
