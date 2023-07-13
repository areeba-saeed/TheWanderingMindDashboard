import "../../style/datatable.css";
import { DataGrid } from "@mui/x-data-grid";
import { productColumns, productRows } from "../../datatablesource";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";

const DatatableBlogs = () => {
  const [blogs, setblogs] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    axios
      .get("https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/blogs")
      .then((response) => {
        setblogs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [blogs]);

  const handleDelete = (id) => {
    axios.delete("https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/blogs/" + id).then((response) => {
      console.log(response.data);
    });

    setblogs(blogs.filter((el) => el._id !== id));
    setPopupshow(true);
    setPopupText("Category Deleted");
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
  };

  const handleDeleteSelectedRows = () => {
    selectedRows.forEach((row) => {
      axios
        .delete("https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/blogs/" + row)
        .then((response) => {
          setblogs(response.data);
          setPopupshow(true);
          setPopupText(`${selectedRows.length} Blogs Deleted`);
        });
    });
    setTimeout(() => {
      setPopupshow(false);
    }, 2000);
    setSelectedRows([]);
  };

  const actionColumn = [
    { field: "name", headerName: "Name", width: 300 },
    {
      field: "category.name",
      headerName: "Category",
      width: 200,
      valueGetter: (params) => params.row.category.name,
    },
    {
      field: "user.name",
      headerName: "User",
      width: 200,
      valueGetter: (params) => params.row.user.name,
    },
    {
      field: "image",
      headerName: "Image",
      width: 200,
      renderCell: (params) => {
        const imageUrl = `https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/blogs/images/${params.row.image}`;
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
      width: 300,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <div
              className="viewButton"
              onClick={() => {
                setSelectedRow(params.row);
                setOpenModal(true);
              }}>
              View
            </div>
            <Link
              to={`/blogs/update/${params.id}`}
              state={{ data: params.row }}
              style={{ textDecoration: "none" }}>
              <div className="viewButton">Update</div>
            </Link>
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
      <div className="datatableTitle">
        Blogs
        <Link to="/blogs/new" className="link-new">
          Add Blog
        </Link>
      </div>
      {selectedRows.length > 0 ? (
        <button
          onClick={() => {
            handleDeleteSelectedRows();
          }}>
          Delete Selected Rows
        </button>
      ) : null}
      {openModal ? (
        <div className="modal">
          <div className="modalInnerExpanded">
            <p className="closeModal" onClick={() => setOpenModal(false)}>
              &times;
            </p>
            <div style={{ margin: 40 }}>
              <h6>Name:</h6>
              <p className="modalText">{selectedRow.name}</p>
              <h6>Category:</h6>
              <p className="modalText">{selectedRow.category.name}</p>
              <h6>Description:</h6>
              <div
                className="modalText"
                dangerouslySetInnerHTML={{
                  __html: selectedRow.description,
                }}></div>
              <h6>Image:</h6>

              <div>
                <img
                  src={`https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/blogs/images/${selectedRow.image}`}
                  alt={selectedRow.image}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      {popUpShow ? (
        <div className="Popupmodal">
          <div
            className="popupInner"
            style={{
              backgroundColor: "red",
              borderWidth: 1,
              borderColor: "red",
            }}>
            <PopupAlert popUpText={popUpText} />
          </div>
        </div>
      ) : (
        ""
      )}
      <DataGrid
        className="datagrid"
        rows={blogs}
        columns={actionColumn}
        getRowHeight={() => "auto"}
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

export default DatatableBlogs;
