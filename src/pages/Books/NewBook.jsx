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

const NewBook = ({ title }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [allCategories, setAllCategories] = useState([]);
  const [popUpShow, setPopupshow] = useState(false);
  const [popUpText, setPopupText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((response) => {
        if (response.data.length > 0) {
          setAllCategories(response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: name,
      description: description,
      price: price,
      category: category,
    };

    axios
      .post("http://localhost:5000/api/books/", data)
      .then((response) => {
        setName("");
        setPrice("");
        setDescription("");
        setCategory("");
        setPopupshow(true);
        setPopupText("Book Added");
        setTimeout(() => {
          setPopupshow(false);
          navigate("/books");
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
                <label className="label-form">Book Name</label>
                <input
                  type="text"
                  className="input-form"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <label className="label-form">Book Price</label>
                <input
                  type="number"
                  placeholder="220"
                  className="input-form"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                  }}
                />
                <label className="label-form">Book Category</label>
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
                <label className="label-form">Book Description</label>
                <ReactQuill
                  value={description}
                  onChange={(value) => setDescription(value)}
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

export default NewBook;
