import { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";
import AuthGuard from "./AuthGuard";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Orders from "./pages/Orders";
import Billings from "./pages/Billings";
import Withdrawals from "./pages/Withdrawals";
import Tickets from "./pages/Tickets";
import News from "./pages/News";
import Rules from "./pages/Rules";

function App() {
  return (
    <div className="App">
      <Router>
        <Fragment>
          <Routes>
            <Route path="/" element={<AuthGuard />}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/product" element={<Products />} />
              <Route path="/user" element={<Users />} />
              <Route path="/order" element={<Orders />} />
              <Route path="/billing" element={<Billings />} />
              <Route path="/seller-withdraw" element={<Withdrawals />} />
              <Route path="/tickets" element={<Tickets />} />
              <Route path="/news" element={<News />} />
              <Route path="/rules" element={<Rules />} />
            </Route>
            <Route path="/login" element={<SignIn />} />
          </Routes>
        </Fragment>
      </Router>
    </div>
  );
}

export default App;
