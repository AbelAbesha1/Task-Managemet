import React, { useState } from "react";
import Modal from "./Modal";
import { useCookies } from "react-cookie";
const ListHeader = ({ ListName ,getData }) => {
  const [Cookies, setCookie , removeCookie] = useCookies(null)
  const signOut = () => {
    console.log("signOut");
    removeCookie('Email')
    removeCookie('AuthToken')
    window.location.reload()
  };
  const [showModal, setshowModal] = useState(false);
  return (
    <div className="list-header">
      <h1> {ListName}</h1>
      <div className="button-container">
        <button className="create" onClick={() => setshowModal(true)}>
          ADD NEW
        </button>
        <button className="signout" onClick={signOut}>
          SIGN OUT
        </button>
      </div>
      {showModal && <Modal mode={"create"} setshowModal={setshowModal}
      getData = {getData} />}
    </div>
  );
};

export default ListHeader;
