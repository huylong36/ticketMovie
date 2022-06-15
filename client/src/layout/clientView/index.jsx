import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AutoFixHighRoundedIcon from "@mui/icons-material/AutoFixHighRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import Cookies from "js-cookie";
import { useHistory, useLocation } from "react-router-dom";
import { FCButton } from "../../component/FCButton";
import { Routes } from "../../navigation/routes";
import { actionLoginSuccess } from "../../screen/login/loginSlice";
import "./style.scss";
import { SlideMovieHot } from "../../screen/slidehot";
const LayoutClient = () => {
  const authReducer = useSelector((state) => state.user);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfo = Cookies.get("user")
      ? JSON.parse(Cookies.get("user") || "")
      : null;
    dispatch(actionLoginSuccess(userInfo));
  }, []);

  const pages = [
    {
      title: "Trang chủ",
      route: Routes.home,
    },
    {
      title: "Đặt vé",
      route: Routes.bookTickets,
    },
    {
      title: "Phim",
      route: Routes.movies,
    },
    {
      title: "Thành viên",
      route: Routes.member,
    },
    {
      title: "Chính sách",
      route: Routes.policy,
    },
  ];
  // eslint-disable-next-line react-hooks/rules-of-hooks

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const handleLogout = useCallback(() => {
    Cookies.remove("user");
    window.location.href = "/";
  }, []);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const renderHeader = () => {
    return (
      <>
        <AppBar position="static">
          <div className="layout_staff_container">
            <div
              className={
                location.pathname !== Routes.birthday
                  ? "bg_overlay"
                  : "bg_overlay_none"
              }
            >
              <Container maxWidth="xl">
                <Toolbar disableGutters>
                  <Typography
                    noWrap
                    component="div"
                    sx={{
                      mr: 2,
                      display: { xs: "none", md: "flex", width: "15%" },
                    }}
                  >
                    <img
                      src="https://fo4.garena.vn/wp-content/themes/fifa-online-4/img/logo.png"
                      width="50%"
                      style={{ objectFit: "cover", cursor: "pointer" }}
                      onClick={() => (window.location.href = Routes.home)}
                    />
                  </Typography>

                  {/* mobile */}
                  <Box
                    sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
                  >
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      aria-controls="menu-appbar"
                      aria-haspopup="true"
                      onClick={handleOpenNavMenu}
                      color="inherit"
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="menu-appbar"
                      anchorEl={anchorElNav}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      open={Boolean(anchorElNav)}
                      onClose={handleCloseNavMenu}
                      sx={{
                        display: { xs: "block", md: "none" },
                      }}
                    >
                      {pages.map((page, key) => (
                        <MenuItem
                          key={key}
                          onClick={() => history.push(page.route)}
                        >
                          <Typography textAlign="center">
                            {page.title}
                          </Typography>
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>

                  {/* desktop */}
                  <Box
                    sx={{
                      flexGrow: 1,
                      display: { xs: "none", md: "flex" },
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    {pages.map((page) => {
                      if (page.privatePage) {
                        return (
                          <FCButton
                            variant="text"
                            color="inherit"
                            text={page.title}
                            handleAction={() => history.push(page.route)}
                            style={
                              location.pathname === page.route
                                ? {
                                    fontWeight: 700,
                                    marginRight: "2rem",
                                    color: "#8490FD",
                                  }
                                : { fontWeight: 700, marginRight: "2rem" }
                            }
                          />
                        );
                      }
                    })}
                    {pages.map((page, key) => (
                      <MenuItem
                        key={key}
                        onClick={() => history.push(page.route)}
                      >
                        <Typography textAlign="center">{page.title}</Typography>
                      </MenuItem>
                    ))}
                    {authReducer.user ? (
                      <>
                        <Tooltip title="Open settings">
                          <IconButton
                            onClick={handleOpenUserMenu}
                            sx={{ p: 0 }}
                          >
                            <Avatar src={authReducer.userInfo?.avatar} />
                          </IconButton>
                        </Tooltip>
                        <Menu
                          sx={{ mt: "45px" }}
                          id="menu-appbar"
                          anchorEl={anchorElUser}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          keepMounted
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                          }}
                          open={Boolean(anchorElUser)}
                          onClose={handleCloseUserMenu}
                        >
                          <MenuItem
                            style={{ display: "flex", alignItems: "center" }}
                            onClick={() => {
                              history.push(
                                `${Routes.profile}/${authReducer.userInfo?._id}`
                              );
                              setAnchorElUser(null);
                            }}
                          >
                            <AutoFixHighRoundedIcon
                              style={{ fontSize: "0.9rem" }}
                            />
                            <Typography
                              textAlign="center"
                              style={{
                                fontSize: "0.9rem",
                                marginLeft: "0.4rem",
                              }}
                            >
                              Thông tin cá nhân
                            </Typography>
                          </MenuItem>
                          <MenuItem
                            style={{ display: "flex", alignItems: "center" }}
                            onClick={handleLogout}
                          >
                            <ExitToAppRoundedIcon
                              style={{ fontSize: "0.9rem" }}
                            />
                            <Typography
                              textAlign="center"
                              style={{
                                fontSize: "0.9rem",
                                marginLeft: "0.4rem",
                              }}
                            >
                              Đăng xuất
                            </Typography>
                          </MenuItem>
                        </Menu>
                      </>
                    ) : (
                      <FCButton
                        variant="outlined"
                        color="inherit"
                        text="Đăng nhập"
                        handleAction={() => history.push(Routes.login)}
                        style={{ fontWeight: 700, marginRight: "2rem" }}
                      />
                    )}
                  </Box>
                </Toolbar>
              </Container>
            </div>
          </div>
        </AppBar>
      </>
    );
  };

  return <>
  
  {renderHeader()}
  <SlideMovieHot/>
  </>;
};
export default LayoutClient;
