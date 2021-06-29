import React from 'react';
import clsx from 'clsx';
import { Link, Route, BrowserRouter as Router,Switch, Redirect } from 'react-router-dom'
import FacultyA from './facultyaccount'
import Coursepage from './coursepage'
import Markattendance from './markattendance'
import Manageattendance from './manageattendance'
import Courses from './courses'
import { makeStyles} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import GradeIcon from '@material-ui/icons/Grade';
import AccountIcon from '@material-ui/icons/AccountBox';
import SettingIcon from '@material-ui/icons/Settings';
import TimeIcon from '@material-ui/icons/Timer';
import {lightGreen,pink} from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';
import Timetable from './timetable'
const drawerWidth = 240;
const Theme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: pink,
  },
});
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
 
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer() {
    function Logout(){
        sessionStorage.removeItem("ftoken")
        window.location.href="http://localhost:3000/"
    }
    const theme = Theme;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Router>
         <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{backgroundColor:'rgb(0,0,0)'}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" noWrap>
           College Administartion System
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}>
        <div className={classes.toolbar}>
          Welcome<br></br>
        {localStorage.getItem("faculty")}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
          <Link to = '/faculty/courses'> 
          <ListItem button key='Add Courses'>
          <ListItemIcon><DashboardIcon/></ListItemIcon>
          <ListItemText primary='Add Courses'/>
          </ListItem>
          </Link>
           <Link to = '/faculty/timetable'> 
          <ListItem button key='Timetable'>
          <ListItemIcon><AccountIcon/></ListItemIcon>
          <ListItemText primary='Timetable'/>
          </ListItem>
          </Link>

        </List> 
        <List style={{marginTop:"650px"}}>
        <Divider />
        <Link to = '/faculty/facultydash'> 
          
        <ListItem button key='facultydash'>
          <ListItemIcon><AccountIcon/></ListItemIcon>
          <ListItemText primary='Account'/>
          </ListItem>
          </Link>
          <ListItem button key='Logout' onClick={Logout}>
          <ListItemIcon><SettingIcon/></ListItemIcon>
          <ListItemText primary='Logout'/>
          </ListItem>
          
        </List>
      </Drawer>
      <Switch>
    
    <Route path="/faculty/facultydash" component={FacultyA}/>
    <Route path="/faculty/courses" component={Courses}/>
    <Route path="/faculty/course/coursepage" component={Coursepage}/>
    <Route path="/faculty/course/markattendance" component={Markattendance}/>
    <Route path="/faculty/course/manageattendance" component={Manageattendance}/>
    <Route path="/faculty/timetable" component={Timetable}/>

    <Redirect to = '/faculty/courses'/>

    </Switch>

    </div>
    </Router>
  );
}
