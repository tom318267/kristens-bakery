import React, { useState } from "react";
import { Link } from "react-router-dom";
import bakingImg from "../../assets/baking.png";
import partyImg from "../../assets/party.png";
import wave from "../../assets/wave.png";
import {
  auth,
  signInWithGoogle,
  createUserProfileDocument,
} from "../../firebase/firebase.utils";
import GoogleButton from "react-google-button";
import "./Signup.scss";

const Signup = () => {
  const [form, setForm] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const onChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSignUpSubmit = async (e) => {
    e.preventDefault();

    const { displayName, email, password, confirmPassword } = form;

    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await createUserProfileDocument(user, { displayName });

      setForm({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onSignInSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = form;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setForm({
        email: "",
        password: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const signUp = () => {
    const container = document.getElementById("container");
    container.classList.add("right-panel-active");
  };

  const signIn = () => {
    const container = document.getElementById("container");
    container.classList.remove("right-panel-active");
  };

  const { displayName, email, password, confirmPassword } = form;

  return (
    <div className="Signup">
      <div
        className="container animate__animated animate__fadeInUp"
        id="container"
      >
        <div className="form-container sign-up-container">
          <form onSubmit={onSignUpSubmit}>
            <h1>Create Account</h1>
            <span>or use your email for registration</span>
            <input
              onChange={onChange}
              type="text"
              name="displayName"
              placeholder="Display Name"
              value={displayName}
              required
            />
            <input
              onChange={onChange}
              name="email"
              type="email"
              placeholder="Email"
              value={email}
              required
            />
            <input
              onChange={onChange}
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              required
            />
            <input
              onChange={onChange}
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={confirmPassword}
              required
            />
            <button>Sign Up</button>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={onSignInSubmit}>
            <h1>Sign in</h1>
            <div className="social-container">
              <GoogleButton
                onClick={signInWithGoogle}
                className="google-button"
              />
            </div>
            <span>or use your account</span>
            <input
              onChange={onChange}
              type="email"
              placeholder="Email"
              name="email"
              value={email}
            />
            <input
              onChange={onChange}
              type="password"
              name="password"
              placeholder="Password"
              value={password}
            />
            <Link className="forgot" href="#">
              Forgot your password?
            </Link>
            <button>Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <img className="party" src={partyImg} alt="party" />
              <div className="welcome-container"></div>
              <h1 className="welcome">Welcome Back!</h1>
              <p className="connect">
                To keep connected with us please login with your personal info
              </p>
              <button onClick={signIn} className="ghost signInBlue" id="signIn">
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Sign up so you can buy the best baked goods!</h1>
              <img className="bakingImg" src={bakingImg} alt="baking-img" />
              <button onClick={signUp} className="ghost" id="signUp">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
      <img className="wave" src={wave} alt="wave" />
    </div>
  );
};

export default Signup;
