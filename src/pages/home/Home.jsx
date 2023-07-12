import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="books" />
          <Widget type="authors" />
          <Widget type="categories" />
        </div>
        <div className="widgets">
          <Widget type="users" />
          <Widget type="new" />
          <Widget type="completed" />
        </div>

        <div className="charts">
          {/* <Chart title="Last 6 Months (Revenue)" aspect={2 / 1} /> */}
        </div>
        {/* <div className="listContainer">
          <div className="listTitle">Latest Transactions</div>
           <Table />
           </div> */}

        {/* <BarChart /> */}
      </div>
    </div>
  );
};

export default Home;
