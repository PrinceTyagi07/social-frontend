import React, { useSyncExternalStore } from 'react'; // Import useState
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './Pages/Home';
import Navbar from './Pages/Navbar';
import Profile from './Pages/Profile';
import Feed from './Pages/Feed';
import Post from './Pages/Post';
import VideoKYCPage from './Pages/VideoKYCPage';
import Cookies from "js-cookie";
import EditProfile from './Components/Profile/EditProfile';
// import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import ProfileSetting from './Components/Profile/ProfileSetting';
import CreatePost from './Components/Posts/CreatePost';
import UserProfile from './Components/userProfile/UserProfile';
import Login from './Components/Auth/Login';


const App = () => {
  let username = "";
  
  const subscribe = (callback) => {
    const intervalId = setInterval(callback, 500); // Check every 500ms (adjust as needed)
    return () => clearInterval(intervalId);
  };

  const getSnapshot = () => Cookies.get("cookie");
  const userToken = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  if (userToken) {
    try {
      const decodedToken = jwtDecode(userToken); // Decode JWT
      username = decodedToken.username; // Assuming the token has a "username" field
     
    } catch (error) {
      console.error("Invalid token:", error);
    }
  }
    return (
    <Router>
      <div>
        {userToken ? <Navbar /> : null} {/* Use null instead of empty div */} {/* Conditional rendering based on state */}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/profile/:username" element={userToken ? <Profile /> : <Navigate to="/" />} /> {/* Protected Route */}
          <Route path="/userProfile/:id" element={userToken ? <UserProfile /> : <Navigate to="/" />} /> {/* Protected Route */}
          <Route path="/feed" element={userToken ? <Feed /> : <Navigate to="/" />} /> {/* Protected Route */}
          <Route path="/post" element={userToken ? <Post /> : <Navigate to="/" />} /> {/* Protected Route */}
          <Route path="/kyc" element={userToken ? <VideoKYCPage /> : <Navigate to="/" />} /> {/* Protected Route */}
          <Route path="/editprofile" element={userToken ? <EditProfile /> : <Navigate to="/" />} /> {/* Protected Route */}
          <Route path="/profileSetting" element={userToken ? <ProfileSetting /> : <Navigate to="/" />} /> {/* Protected Route */}
          {/* create post route */}
          <Route path="/createpost" element={userToken ? <CreatePost /> : <Navigate to="/" />} /> {/* Protected Route */}
          {/* <Route path="/${user.username}" element={userToken ? <CreatePost /> : <Navigate to="/" />} /> Protected Route */}
         
        </Routes>
      </div>
    </Router>
    
  );
};

export default App;