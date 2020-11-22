import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import {Home, Add, Update} from './Pages'
import Navbar from "./Components/Navbar";

function App() {
  return (
    <Router>
        <Navbar/>
        <Route path="/" component={Home} exact />
        <Route path="/add" component={Add} exact />
        <Route path="/update/:id" component={Update} exact />
      </Router>
  );
}

export default App;
