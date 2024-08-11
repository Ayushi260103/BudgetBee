import {
    SignedIn,
    SignedOut,
    SignInButton,
    SignUpButton,
  } from "@clerk/clerk-react";
  import { Navigate } from "react-router-dom";
  import "./index.css";
  
  export const Auth = () => {
    return (
      <div className="sign-in-container">
        <SignedOut>
          <h1> Welcome to Your Own Personal Finance Tracker!</h1>
          <SignUpButton mode="modal" signInForceRedirectUrl="/" >
          <button className="sign-up-btn">Sign up</button>
          </SignUpButton>
          <SignInButton mode="modal">
          <button className="sign-up-btn">Sign in</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <Navigate to="/" />
        </SignedIn>
      </div>
    );
  };