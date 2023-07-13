import "../../style/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import PopupAlert from "../../components/popupalert/popupAlert";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";

const NewBlog = ({ title }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [user, setUser] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const quillModules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // text formatting options
      [{ header: [1, 2, 3, 4, 5, 6, false] }], // header styles
      [{ list: "ordered" }, { list: "bullet" }], // lists
      ["link", "image"], // link and image options
      [{ color: [] }], // color option
      [{ align: [] }], // text alignment option
      [{ size: ["small", false, "large", "huge"] }],
      [{ font: [] }], // custom font style option
      ["clean"], // remove formatting
    ],
  };

  const quillFormats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "header",
    "list",
    "bullet",
    "link",
    "image",
    "color",
    "align",
    "font",
    "size",
  ];

  useEffect(() => {
    axios
      .get("https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/categories")
      .then((response) => {
        setAllCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/users")
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("user", user);
    formData.append("description", description);
    formData.append("category", category);

    axios
      .post("https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/blogs/", formData)
      .then((response) => {
        console.log(response.data);
        setName("");
        setUser("");
        setDescription("");
        setCategory("");
        setPopupshow(true);
        setPopupText("Blog Added");
        setTimeout(() => {
          setPopupshow(false);
          navigate("/blogs");
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
        if (error.response.data) {
          setErrorMessage(error.response.data);
        }
      });
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        {popUpShow ? (
          <div className="Popupmodal">
            <div
              className="popupInner"
              style={{
                backgroundColor: "#8AFF8A",
                borderWidth: 1,
                borderColor: "#007500",
              }}>
              <PopupAlert popUpText={popUpText} />
            </div>
          </div>
        ) : (
          ""
        )}
        <div className="top-new">
          <h1 className="heading-top">{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <div style={{ color: "red", fontSize: 15 }}>{errorMessage}</div>

            <form
              className="form-new"
              onSubmit={handleSubmit}
              method="post"
              encType="multipart/form-data"
              action="/upload">
              <div className="formInput">
                <label className="label-form">Blog Name</label>
                <input
                  type="text"
                  className="input-form"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <label className="label-form">Blog User</label>
                <select
                  className="input-form"
                  value={user}
                  onChange={(e) => {
                    setUser(e.target.value);
                  }}>
                  <option value="">Choose a user</option>
                  {allUsers.map((data) => {
                    return <option value={data._id}>{data.name}</option>;
                  })}
                </select>
                <label className="label-form">Blog Category</label>
                <select
                  className="input-form"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}>
                  <option value="">Choose a category</option>
                  {allCategories.map((data) => {
                    return <option value={data._id}>{data.name}</option>;
                  })}
                </select>
                <label className="label-form">Blog Description</label>
                <ReactQuill
                  value={description}
                  onChange={(value) => setDescription(value)}
                  modules={quillModules}
                  formats={quillFormats}
                />
                <label className="label-form">Blog Image</label>
                <input
                  type="file"
                  className="category-image"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                  }}
                />
                <button className="createButton">Add</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBlog;
