import { Icon } from '@iconify/react';
import { useRef, useState, useContext, useEffect } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha } from '@mui/material/styles';
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from '@mui/material';
// components
import MenuPopover from '../../components/MenuPopover';
//
import account from '../../_mocks_/account';
import { AuthContext } from '../../store/auth-context';
import dotenv from "dotenv";
dotenv.config();
const API_SERVER=process.env.REACT_APP_LSEXAM_API_SERVER; 

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: homeFill,
    linkTo: '/dashboard/app'
  },
  {
    label: 'Profile',
    icon: personFill,
    linkTo: '/dashboard/user'
  },
  // {
  //   label: 'Settings',
  //   icon: settings2Fill,
  //   linkTo: '/dashboard/'
  // }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {

  const authCtx = useContext(AuthContext);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [userState, setUserState] = useState(null);
  const [stateToken, setStateToken] = useState(null);

  useEffect(() => {
    //fetch data from server
    const apiUrl = `${API_SERVER}/api/user/profile/`;
    const auth = authCtx.token;

    const request = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth,
      },
    };

    fetch(apiUrl, request)
      .then((res) => res.json())
      .then((response) => {
        console.log(response.data);
        setUserState(response.data.user);
        
      });

    },[])

  
  if (userState !== null) {
    return (
      <>
        <IconButton
          ref={anchorRef}
          onClick={handleOpen}
          sx={{
            padding: 0,
            width: 44,
            height: 44,
            ...(open && {
              "&:before": {
                zIndex: 1,
                content: "''",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                position: "absolute",
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
              },
            }),
          }}
        >
          <Avatar src={authCtx.avatar} alt="photoURL" />
        </IconButton>

        <MenuPopover
          open={open}
          onClose={handleClose}
          anchorEl={anchorRef.current}
          sx={{ width: 220 }}
        >
          <Box sx={{ my: 1.5, px: 2.5 }}>
            <Typography variant="subtitle1" noWrap>
              {authCtx.firstName} {authCtx.lastName}
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
              {userState.email}
            </Typography>
          </Box>

          <Divider sx={{ my: 1 }} />

          {MENU_OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              to={option.linkTo}
              component={RouterLink}
              onClick={handleClose}
              sx={{ typography: "body2", py: 1, px: 2.5 }}
            >
              <Box
                component={Icon}
                icon={option.icon}
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24,
                }}
              />

              {option.label}
            </MenuItem>
          ))}

          <Box sx={{ p: 2, pt: 1.5 }}>
            <Button
              fullWidth
              color="inherit"
              variant="outlined"
              onClick={authCtx.logout}
              href="/"
            >
              Logout
            </Button>
          </Box>
        </MenuPopover>
      </>
    );
  } else {
    return (
      <div></div>
    )
  }
}
