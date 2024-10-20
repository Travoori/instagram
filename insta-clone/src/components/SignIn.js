import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase"; // Firebase config file
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false); // Toggle between sign in and sign up
  const navigate = useNavigate();

  // Handle sign in
  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Redirect to home after login
    } catch (error) {
      setError(error.message);
    }
  };

  // Handle sign up
  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/home"); // Redirect to home after sign up
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signin">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
        alt="Instagram Logo"
        style={{ width: "100px", marginBottom: "20px" }}
      />

      <h2>{isSignUp ? "Sign Up" : "Sign In"}</h2>
      <form onSubmit={isSignUp ? handleSignUpSubmit : handleSignInSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">{isSignUp ? "Sign Up" : "Sign In"}</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div>
        {isSignUp ? (
          <p>
            Already have an account?{" "}
            <button
              onClick={() => setIsSignUp(false)}
              style={{
                border: "none",
                background: "none",
                color: "blue",
                cursor: "pointer",
              }}
            >
              Sign In
            </button>
          </p>
        ) : (
          <p>
            Don't have an account?{" "}
            <button
              onClick={() => setIsSignUp(true)}
              style={{
                border: "none",
                background: "none",
                color: "blue",
                cursor: "pointer",
              }}
            >
              Sign Up
            </button>
          </p>
        )}
      </div>
    </div>
  );
};

export default SignIn;
