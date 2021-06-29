import './App.css';
import 'react-pro-sidebar/dist/css/styles.css';

import Login from "./Component/admin/login"
import Admin from "./Component/admin/adminhome"
import Home from "./home"

import Flogin from "./Component/faculty/login"
import Faculty from "./Component/faculty/facultyhome"
import Flogout  from "./Component/faculty/logout"
import Slogin from "./Component/student/login"
import Student from "./Component/student/studenthome"
import Slogout  from "./Component/student/logout"
import { Route, BrowserRouter as Router,Switch, Redirect } from 'react-router-dom'
import Logout from "./logout"
function App() {
  return (
    <div className="App">
{/* <Header/>; */}
<Router>
  <Switch>
      <Route path="/adminlogin" component={Login}/>
      <Route path="/admin" component={Admin}/>
      <Route path="/logout" component={Logout}/>
      
      
      <Route path="/facultylogin" component={Flogin}/>
      <Route path="/faculty" component={Faculty}/>
      <Route path="/flogout" component={Flogout}/>

      <Route path="/studentlogin" component={Slogin}/>
      <Route path="/student" component={Student}/>
      <Route path="/slogout" component={Slogout}/>
      <Route path="/" component={Home}/>
  </Switch>
</Router>
    </div>
  );
}

export default App;
