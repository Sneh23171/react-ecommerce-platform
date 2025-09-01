import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function Profile({ setIsLoggedIn }) {
  const [userData, setUserData] = useState(null);
const navigate = useNavigate();
   const handleLogout = () => {
      const confirmLogout = window.confirm("Are you sure you want to log out?");
      if (confirmLogout) {
        setIsLoggedIn(false);
        localStorage.removeItem("currentUser");
        navigate("/"); // or "/login"
      }
    };


  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      try {
        setUserData(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

  if (!userData) {
    return (
      <div style={{ padding: "2rem", textAlign: "center" }}>
        <h2>No user data found</h2>
        <p>Please login or sign up.</p>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <h2>My Profile</h2>
      <div className="profile-info">
        <p><strong>Full Name:</strong> {userData.fullname}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Phone Number:</strong> {userData.phone}</p>  


        <button className="logout-button" onClick={handleLogout}>
  Logout
</button>
<NavLink to="/edit-profile" className="edit-profile">
  Edit Profile
</NavLink>



      </div>
    </div>
  );
}

export default Profile;
