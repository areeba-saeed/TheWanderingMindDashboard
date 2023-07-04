import React from "react";
import "../../style/list.scss";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import DatatableAuthors from "./DatatableAuthors";

const Authors = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div>
          <DatatableAuthors />
        </div>
      </div>
    </div>
  );
};

export default Authors;
