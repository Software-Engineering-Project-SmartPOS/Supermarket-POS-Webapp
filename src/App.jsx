import { useState } from "react";
import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        {/* <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} /> */}
        <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className="col">
          <div className="row">
            <h1>Heading 1</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, voluptate, quibusdam, quia voluptas quod quos voluptatibus
              quae doloribus quidem voluptatem. Quisquam, quia
            </p>
          </div>
          <div className="row">
            <h1>Heading 1</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, voluptate, quibusdam, quia voluptas quod quos voluptatibus
              quae doloribus quidem voluptatem. Quisquam, quia
            </p>
          </div>
          <div className="row">
            <h1>Heading 1</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, voluptate, quibusdam, quia voluptas quod quos voluptatibus
              quae doloribus quidem voluptatem. Quisquam, quia
            </p>
          </div>
          <div className="row">
            <h1>Heading 1</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, voluptate, quibusdam, quia voluptas quod quos voluptatibus
              quae doloribus quidem voluptatem. Quisquam, quia
            </p>
          </div>
          <div className="row">
            <h1>Heading 1</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, voluptate, quibusdam, quia voluptas quod quos voluptatibus
              quae doloribus quidem voluptatem. Quisquam, quia
            </p>
          </div>
          <div className="row">
            <h1>Heading 1</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, voluptate, quibusdam, quia voluptas quod quos voluptatibus
              quae doloribus quidem voluptatem. Quisquam, quia
            </p>
          </div>
          <div className="row">
            <h1>Heading 1</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, voluptate, quibusdam, quia voluptas quod quos voluptatibus
              quae doloribus quidem voluptatem. Quisquam, quia
            </p>
          </div>
          <div className="row">
            <h1>Heading 1</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, voluptate, quibusdam, quia voluptas quod quos voluptatibus
              quae doloribus quidem voluptatem. Quisquam, quia
            </p>
          </div>
          <div className="row">
            <h1>Heading 1</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, voluptate, quibusdam, quia voluptas quod quos voluptatibus
              quae doloribus quidem voluptatem. Quisquam, quia
            </p>
          </div>
          <div className="row">
            <h1>Heading 1</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatum, voluptate, quibusdam, quia voluptas quod quos voluptatibus
              quae doloribus quidem voluptatem. Quisquam, quia
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
