import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
  e.preventDefault(); 

  const fullname = e.target.fullname.value.trim();
  const email = e.target.email.value.trim();
  const password = e.target.password.value;
  const phone = e.target.phone.value.trim();
  const confirmpassword = e.target.confirmpassword.value;

  const SignPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!SignPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  if (password.length < 8) {
    alert("Password must be at least 8 characters.");
    return;
  }

  if (password !== confirmpassword) {
    alert("Passwords do not match.");
    return;
  }

  const phonePattern = /^[0-9]{10}$/;
  if (!phonePattern.test(phone)) {
    alert("Phone number must be exactly 10 digits and contain only numbers.");
    return;
  }


  const users = JSON.parse(localStorage.getItem("users") || "[]");

  
  const emailExists = users.some(user => user.email === email);
  if (emailExists) {
    alert("This email already has an account. Please login.");
    return;
  }

users.push({ email, password, fullname, phone });

// ✅ Save the users array
localStorage.setItem("users", JSON.stringify(users));

// ✅ Set currentUser for Profile page
localStorage.setItem("currentUser", JSON.stringify({ email, fullname, phone }));

navigate("/login");

};

  return (
    <form className="main-signup" id="signupForm" onSubmit={handleSubmit}>
      <div className="signup-container">
        <div className="logo-Sign">
          <h1>Welcome</h1>
          <p>Create your account to get started</p>
        </div>

  <div className="form-group">
          <label htmlFor="email">Full Name</label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            className="form-input"
            placeholder="Enter your Fullname"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            id="confirmpassword"
            name="confirmpassword"
            className="form-input"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Phone No.</label>
         <input
    type="tel"
    id="phone"
    name="phone"
    className="form-input"
    placeholder="Enter your phone number"
    
    required
  />
        </div>

        <button type="submit" className="signup-btn">
          Create Account
        </button>

        <div className="login-link">
          Already have an account? <Link to="/Login">Login</Link>
        </div>
      </div>
    </form>
  );
}

export default Signup;
