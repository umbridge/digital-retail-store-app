import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { HiOutlineChevronLeft } from "react-icons/hi";
import { SidebarData } from "./SidebarData";
import "./Sidebar.scss";
import { IconContext } from "react-icons";
import logo from "../../assets/images/final_logo.png";
import { useTranslation } from "react-i18next";
import authService from "../../services/auth.service";
import AuthService from "../../services/auth.service";

import ProfileDropdown from "../profiles/ProfileDropdown";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);
 
  const showSidebar = () => {
    setSidebar(!sidebar);
  };
  
  const [loggedIn, setLoggedIn] = useState(false);
  const { t } = useTranslation();
  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   phoneNumber: "",
  //   userId: 0,
  // });

  function logout(){
    AuthService.logout();
  }
  
  useEffect(() => {
    const token = authService.getCurrentUser();
    if (token) {
      setLoggedIn(true);
    }

   
  }, []);

  return (
    <div data-testid="sidebar">
      <IconContext.Provider value={{ color: "black" }}>
        <div className="sidebar">
          <Link to="#" className="menu-bars">
            <FaBars onClick={showSidebar} data-testid="show-side-bar" />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"} data-testid="nav-bar">
          <ul className="nav-menu-items" >
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars  barHeader">
                <HiOutlineChevronLeft onClick={showSidebar} className="backIcon"/>
                {/* <h2 className="logoNameMenu">Digitail<span className="vrMenu">VR</span></h2> */}
                <img className="logo" src={logo} alt="logo"  />
              </Link>
            </li>
           
            <br />
            <br />
            {loggedIn === false ? (
              <>
                <li>
                  <h4 className="welcomeMsg">{t("MenubarMessage")}</h4>
                </li>
                <br />
              </>
            ) : (
              <div>
                {/* <li>
                  <h4 className="welcomeMsg">
                    {"HI,"}
                    {"  "}
                    {user.name.length > 20
                      ? user.name.substring(0, 20) + "...!"
                      : user.name+"!"}
                  </h4>
                </li> */}
                
                <ProfileDropdown />
                {/* <select onChange={handleProfileChange} id="profile-selection" value={selectedProfile} className="profile-selection" onClick={showSidebar}>
                    {
                        profiles.map((profile, idx) => {
                           
                            return <option value={profile.p_name}  className='profile-select-options'  key={idx}><BiUser/> {profile.p_name}</option>
                        })
                    }
                </select> */}
                <br />
              </div>
            )}
            
            {loggedIn === false ? (
              <div className="notLoggedIn">
                <p className="loginPls">{t('LoginToView')}</p>
                <Link to="/signin">
                  <button className="log">LOG IN</button>
                </Link>
                <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
                <br /><br /><br />
                
              </div>
            ) : (
              // {...(item.title) === "LOGOUT"? (onclick=logout):({})}
              SidebarData.map((item, index) => {
                return (
                  <li key={index} className={item.cName} onClick={item.title==='Sign Out'?logout : showSidebar}>
                    <Link to={item.path}  >
                      {item.icon}
                      <span className="sidebar-text"> {item.title}</span>
                    </Link>
                  </li>
                );
              })
            )}
            <br />
            <br />
            <li className={"nav-text"} onClick={showSidebar}>
              <Link to={'#'}>
                <AiOutlineInfoCircle />
                <span className="help">Help</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </div>
  );
};

export default Sidebar;
