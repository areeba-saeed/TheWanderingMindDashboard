import "../../style/new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PopupAlert from "../../components/popupalert/popupAlert";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UpdateBlog = ({ title }) => {
  const location = useLocation();
  const data = location.state.data;
  const [name, setName] = useState(data.name);
  const [category, setCategory] = useState(data.category._id);
  const [description, setDescription] = useState(data.description);
  const [image, setImage] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    axios
      .get("https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/categories")
      .then((response) => {
        setAllCategories(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("description", description);
    formData.append("category", category);

    axios
      .patch(`https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/blogs/${id}`, formData)
      .then((res) => {
        console.log(res.data);
        setPopupshow(true);
        setPopupText("Blog Updated");
        setTimeout(() => {
          setPopupshow(false);
          navigate("/blogs");
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top-new">
          <h1 className="heading-top">{title}</h1>
        </div>
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
        <div className="bottom">
          <div className="right">
            <form className="form-new" onSubmit={handleUpdate}>
              <div className="formInput">
                <label className="label-form">Blog Name</label>
                <input
                  type="text"
                  className="input-form"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <label className="label-form">Blog User</label>

                <label className="label-form">Blog Category</label>
                <select
                  className="input-form"
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                  }}>
                  {allCategories.map((data) => {
                    return (
                      <option value={data._id} key={data._id}>
                        {data.name}
                      </option>
                    );
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
                <button className="createButton">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
