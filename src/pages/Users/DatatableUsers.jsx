import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns } from "../../datatablesource";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";

const DatatableUsers = () => {
  const [users, setUsers] = useState([]);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    axios
      .get("https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [users]);

  const handleDelete = (id) => {
    axios
      .delete("https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/users/delete/" + id)
      .then((response) => {
        console.log(response.data);
      });

    setPopupshow(true);
    setPopupText("User Deleted");
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
  };

  const handleDeleteSelectedRows = () => {
    selectedRows.forEach((row) => {
      axios
        .delete("https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/users/delete/" + row)
        .then((response) => {
          setPopupshow(true);
          setPopupText(`${selectedRows.length} Users Deleted`);
        });
    });
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
    setSelectedRows([]);
  };

  const actionColumn = [
    {
      field: "name",
      headerName: "Name",
      width: 220,
    },
    {
      field: "email",
      headerName: "Email",
      width: 280,
    },

    {
      field: "image",
      headerName: "Image",
      width: 200,
      renderCell: (params) => {
        const imageUrl = `https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/user/images/${params.row.image}`;
        return (
          <img
            src={imageUrl}
            alt={params.row.image}
            style={{ width: 40, height: 40 }}
          />
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 180,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}>
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">Users</div>
      {selectedRows.length > 0 ? (
        <button
          onClick={() => {
            handleDeleteSelectedRows();
          }}>
          Delete Selected Rows
        </button>
      ) : null}
      {popUpShow ? (
        <div className="Popupmodal">
          <div
            className="popupInner"
            style={
              popUpShow && popUpText === "Category Added"
                ? {
                    backgroundColor: "#8AFF8A",
                    borderWidth: 1,
                    borderColor: "#007500",
                  }
                : { backgroundColor: "red", borderWidth: 1, borderColor: "red" }
            }>
            <PopupAlert popUpText={popUpText} />
          </div>
        </div>
      ) : (
        ""
      )}
      <DataGrid
        className="datagrid"
        rows={users}
        columns={actionColumn}
        checkboxSelection={true}
        onSelectionModelChange={(newSelection) => {
          setSelectedRows(newSelection);
        }}
        getRowId={(row) => {
          return row._id;
        }}
        pageSize={9}
        rowsPerPageOptions={[9]}
      />
    </div>
  );
};

export default DatatableUsers;
