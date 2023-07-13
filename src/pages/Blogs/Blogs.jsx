import "../../style/list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DatatableBlogs from "./DatatableBlog";

const Blogs = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <DatatableBlogs />
      </div>
    </div>
  );
};

export default Blogs;
