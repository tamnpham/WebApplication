import PropTypes from 'prop-types';
import { useEffect, useContext, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar } from '@mui/material';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
//
import sidebarConfig from './SidebarConfig';
import account from '../../_mocks_/account';
import { AuthContext } from "../../store/auth-context";
// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('lg')]: {
        flexShrink: 0,
        width: DRAWER_WIDTH
    },
    color: 'white',
}));

const AccountStyle = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: theme.shape.borderRadiusSm,
    backgroundColor: '#161d31',
    color: 'white',
}));

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
    isOpenSidebar: PropTypes.bool,
    onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
    const { pathname } = useLocation();
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        if (isOpenSidebar) {
            onCloseSidebar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const [userState, setUserState] = useState(null);

    useEffect(() => {
      //fetch data from server
      const apiUrl = `http://34.72.189.169:8080/api/user/profile/`;
      const auth = localStorage.getItem("token");
  
      const request = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth,
        },
      };
      
      console.log('hahaa');

      fetch(apiUrl, request)
        .then((res) => res.json())
        .then((response) => {
          setUserState(response.data.user);
        });
  
      },[])
    
    const renderContent = (
      <Scrollbar
        sx={{
          backgroundColor: "#161d31",
          height: "100%",
          "& .simplebar-content": {
            height: "100%",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Box sx={{ px: 2.5, py: 3 }}>
          <Box
            component={RouterLink}
            to="/dashboard/app"
            sx={{ display: "inline-flex" }}
          >
            <Logo />
          </Box>{" "}
        </Box>
        <Box sx={{ mb: 5, mx: 2.5 }}>
          <Link underline="none" component={RouterLink} to="#">
            <AccountStyle>
              {userState !== null && (
                <Avatar src={userState.avatar} alt="photoURL" />
              )}
              <Box sx={{ ml: 2 }}>
                {userState !== null && (
                  <Typography variant="subtitle2" sx={{ color: "white" }}>
                    {userState.first_name} {userState.last_name}
                  </Typography>
                )}
              </Box>{" "}
            </AccountStyle>{" "}
          </Link>{" "}
        </Box>
        <NavSection navConfig={sidebarConfig} />
        <Box sx={{ flexGrow: 1 }} />
        <Typography
          variant="body2"
          sx={{ color: "white", textAlign: "center", pb: 3 }}
        >
          Copyright by TamTriLong{" "}
        </Typography>{" "}
      </Scrollbar>
    );

    if (userState !== null) {
    return (
      <RootStyle>
        <MHidden width="lgUp">
          <Drawer
            open={isOpenSidebar}
            onClose={onCloseSidebar}
            PaperProps={{
              sx: { width: DRAWER_WIDTH },
            }}
          >
            {renderContent}{" "}
          </Drawer>{" "}
        </MHidden>
        <MHidden width="lgDown">
          <Drawer
            open
            variant="persistent"
            PaperProps={{
              sx: {
                width: DRAWER_WIDTH,
                bgcolor: "background.default",
              },
            }}
          >
            {renderContent}{" "}
          </Drawer>{" "}
        </MHidden>{" "}
      </RootStyle>
    );
} else {
  return <div></div>;
}
}
