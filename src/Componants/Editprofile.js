import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (currentUser) {
      setFormData(currentUser);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Update currentUser in localStorage
    localStorage.setItem("currentUser", JSON.stringify(formData));

    // Update user in users array
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUsers = users.map((user) =>
      user.email === formData.email ? { ...user, ...formData } : user
    );
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    alert("Profile updated!");
    navigate("/profile");
  };

  return (
    <div className="edit-profile-page">
      <h2>Edit Profile</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label>Full Name</label>
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          required
        />

        <label>Email (cannot be changed)</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          readOnly
        />

        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default EditProfile;
