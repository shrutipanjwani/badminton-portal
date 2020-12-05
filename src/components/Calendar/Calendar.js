import React from 'react';
import { Link, Redirect} from 'react-router-dom'
import './Calendar.css';
import * as mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.min.css';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));

function CalendarPage() {

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose} component={Link} to="/profile">Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/logout"> Logout </Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit" component={Link} to="/wallet">
          <Badge color="secondary">
            <AccountBalanceWalletIcon />
          </Badge>
        </IconButton>
        <p>Wallet</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const [myEvents, setEvents] = React.useState([]);

    React.useEffect(() => {
        mobiscroll.util.http.getJson('https://trial.mobiscroll.com/custom-events/', (events) => {
            setEvents(events);
        }, 'jsonp');
    }, []);
    
    const view = React.useMemo(() => {
        return {
            calendar: { popover: true }
        };
    }, []);
    
    const getParticipant = (id) => {
        switch (id) {
            case 1:
                return {
                    img: 'https://img.mobiscroll.com/demos/m1.png',
                    name: 'Barry L.'
                };
            case 2:
                return {
                    img: 'https://img.mobiscroll.com/demos/f1.png',
                    name: 'Hortense T.'
                };
            case 3:
                return {
                    img: 'https://img.mobiscroll.com/demos/m2.png',
                    name: 'Carl H.'
                };
        }
    };
    
    const add = (ev, data) => {
        ev.stopPropagation();
        mobiscroll.toast({
            message: getParticipant(data.participant).name + '\'s event clicked'
        });
    };
    
    const renderEventContent = React.useCallback((data) => {
        return 
        <React.Fragment>
            <div>{data.title}</div>
                <div className="md-custom-event-cont">
                    <img className="md-custom-event-img" src={getParticipant(data.original.participant).img} />
                    <div className="mbsc-custom-event-name">{getParticipant(data.original.participant).name}</div>
                    <mobiscroll.Button className="md-custom-event-btn" color="secondary" variant="outline" onClick={(domEvent) => add(domEvent, data.original)}>Add participant</mobiscroll.Button>
                </div>
        </React.Fragment>
    });

    return (
      <>
        <div className={classes.grow}>
          <AppBar position="static">
            <Toolbar>
              {/*<IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
              </IconButton>*/}
              <Typography className={classes.title} variant="h6" noWrap>
                Badminton Court
              </Typography>
              
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton aria-label="show 17 new notifications" color="inherit" component={Link} to="/wallet">
                  <Badge color="secondary">
                    <AccountBalanceWalletIcon/>
                  </Badge>
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </div>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </div>
        <div>
            <mobiscroll.Eventcalendar
              theme="ios" 
              themeVariant="light" 
              dragToCreate={true} 
              dragToMove={true} 
              dragToResize={true}
              renderEventContent={renderEventContent}
              data={myEvents}
              view={view}
           />
       </div>
      </>
    ); 
}

export default CalendarPage;