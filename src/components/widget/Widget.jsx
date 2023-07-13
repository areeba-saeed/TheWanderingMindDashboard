import "./widget.scss";
import PersonIcon from "@mui/icons-material/Person";
import MedicationIcon from "@mui/icons-material/Medication";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import CountUp from "react-countup";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
const Widget = ({ type }) => {
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/blogs")
      .then((response) => {
        setBlogs(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/users")
      .then((response) => {
        setUsers(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/contacts")
      .then((response) => {
        const findPending = response.data.filter(
          (row) => row.status === "Pending"
        );
        setContacts(findPending.length);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("https://the-wandering-mind-57dc8d77c813.herokuapp.com/api/comments")
      .then((response) => {
        setComments(response.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [blogs, users, contacts, comments]);
  let data;

  //temporary
  // const diff = 20;

  switch (type) {
    case "blogs":
      data = {
        title: "TOTAL BOOKS",
        isMoney: false,
        amount: <CountUp start={0} end={blogs} duration={3} />,

        // link: "See all users",
        icon: (
          <PersonIcon
            className="icon"
            style={{
              backgroundColor: "white",
              color: "black",
            }}
          />
        ),
      };
      break;
    case "comments":
      data = {
        title: "TOTAL COMMENTS",
        isMoney: false,
        amount: <CountUp start={0} end={comments} duration={3} />,

        // link: "See all users",
        icon: (
          <PersonIcon
            className="icon"
            style={{
              backgroundColor: "white",
              color: "black",
            }}
          />
        ),
      };
      break;
    case "contacts":
      data = {
        title: "TOTAL CONTACTS",
        isMoney: false,
        amount: <CountUp start={0} end={contacts} duration={3} />,

        // link: "View all orders",
        icon: (
          <MedicationIcon
            className="icon"
            style={{
              backgroundColor: "white",
              color: "black",
            }}
          />
        ),
      };
      break;

    case "users":
      data = {
        title: "TOTAL USERS",
        isMoney: false,
        amount: <CountUp start={0} end={users} duration={3} />,
        // link: "View all orders",
        icon: (
          <LocationCityIcon
            className="icon"
            style={{
              backgroundColor: "white",
              color: "black",
            }}
          />
        ),
      };
      break;

    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">{data.icon}</div>

      <div className="right">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.amount}
        </span>
      </div>
    </div>
  );
};

export default Widget;
