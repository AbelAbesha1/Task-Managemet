import React, { useState } from "react";
import { useCookies } from "react-cookie";

const Modal = ({ mode, setshowModal, getData, task }) => {
  const editMode = mode === "edit" ? true : false;
  const [Cookies, setCookies , removeCookies] = useCookies(null)
  const [data, setdata] = useState({
    user_email: task?.user_email || Cookies.Email,
    title: task?.title || "",
    progress: task?.progress || 50,
    date: task?.date ? new Date(task.date) : new Date(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const postData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/tasks/`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.status === 200) {
        console.log("task added");
        setshowModal(false);
        getData();
      }
    } catch (error) {
      console.error(error);
    }
  };
  const editData = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.REACT_APP_SERVERURL}/tasks/${task.id}`,
        {
          method: "PUT",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      if (response.status === 200) {
        console.log("task edited");
        getData();
        setshowModal(false);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
 
  
  return (
    <div className="overlay">
      <div className="modal">
        <div className="form-title-container">
          <h3>let's {mode} your task</h3>
          <button onClick={() => setshowModal(false)}>X</button>
        </div>
        <form>
          <input
            
            required
            placeholder=" Your task goes here"
            name="title"
            value={data.title}
            onChange={handleChange}
          />
          <br />
          <label htmlFor="range">Drag to select your current progress</label>
          <input
            type="range"
            required
            id="range"
            min={0}
            max={100}
            name="progress"
            value={data.progress}
            onChange={handleChange}
          />
          <input
            className={mode}
            type="submit"
            onClick={editMode ? editData : postData}
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;