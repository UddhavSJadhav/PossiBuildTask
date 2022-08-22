import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.js";
import Upload from "./components/Upload";
import PlayVideo from "./components/PlayVideo";
import VideosList from "./components/VideosList";

function App() {
  return (
    <>
      <Router>
        <nav className='navbar navbar-expand-lg bg-light'>
          <div className='container-fluid'>
            <button
              className='navbar-toggler'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#navbarNavAltMarkup'
              aria-controls='navbarNavAltMarkup'
              aria-expanded='false'
              aria-label='Toggle navigation'>
              <span className='navbar-toggler-icon'></span>
            </button>
            <div
              className='collapse navbar-collapse ms-auto'
              id='navbarNavAltMarkup'>
              <div className='navbar-nav'>
                <Link className='nav-link active' to='/videos'>
                  Videos
                </Link>
                <Link className='nav-link active' to='/'>
                  Upload
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path='/' element={<Upload />} />
          <Route path='/videos' element={<VideosList />} />
          <Route path='/playvideo' element={<PlayVideo />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
