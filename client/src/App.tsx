import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Dashboard } from "./pages/dashboard";
import { Auth } from "./pages/auth";
import { FinancialRecordsProvider } from "./contexts/financial-record-context";
import { SignedIn, UserButton, SignedOut } from "@clerk/clerk-react";
import logo from "./assets/pic.png";
// import { dark } from "@clerk/themes";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="navbar">
          <span className="logo-div">
          <img className="logo-img" src={logo} />
          <span>BudgetBee</span>
          </span>
          <Link to="/"> Dashboard</Link>
          <SignedIn>
            <UserButton /> {/*showname*/}
          </SignedIn>
          <SignedOut>
          <Link to="/auth"> Sign In</Link>
          </SignedOut>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <FinancialRecordsProvider>
                <Dashboard />
              </FinancialRecordsProvider>
            }
          />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;