import PropTypes from 'prop-types';
import { useEffect } from 'react';
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

    useEffect(() => {
        if (isOpenSidebar) {
            onCloseSidebar();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

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
              <Avatar src={account.photoURL} alt="photoURL" />
              <Box sx={{ ml: 2 }}>
                <Typography variant="subtitle2" sx={{ color: "white" }}>
                  {" "}
                  {account.displayName}{" "}
                </Typography>{" "}
                <Typography variant="body2" sx={{ color: "white" }}>
                  {" "}
                  {account.role}{" "}
                </Typography>{" "}
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
}