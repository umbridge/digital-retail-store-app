import React from 'react';
import {AiOutlinePoweroff,AiOutlineHeart,AiOutlineAppstore,AiOutlineStar, AiOutlinePercentage} from 'react-icons/ai';
import {CgRuler} from 'react-icons/cg';
import {BiUser} from 'react-icons/bi';
import AuthService from '../../services/auth.service';
function logout(){
  AuthService.logout();
}
export const SidebarData = [
  {
    title: 'Personal Information',
    path: '/personal-details',
    icon: <BiUser  className='userIcon' />,
    cName: 'nav-text'
  },
  {
    title: 'Measurements',
    path: '/measurement',
    icon: <CgRuler/>,
    cName: 'nav-text'
  },
  {
    title: 'My Wishlist',
    path: '#',
    icon: <AiOutlineHeart />,
    cName: 'nav-text'
  },
  {
    title: 'My Orders',
    path: '#',
    icon: <AiOutlineAppstore/>,
    cName: 'nav-text'
  },
  {
    title: 'Rewards',
    path: '#',
    icon: <AiOutlineStar />,
    cName: 'nav-text'
  },
  {
    title: 'Vouchers',
    path: '#',
    icon: <AiOutlinePercentage/>,
    cName: 'nav-text'
  },
  {
    title: 'Sign Out',
    path: '/signin',
    icon: <AiOutlinePoweroff onClick={logout}/>,
    cName: 'nav-text'
  }
];