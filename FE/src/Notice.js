import axios from 'axios';
import React,{useEffect, useState} from 'react';
import { useHistory,useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { Button,Navbar,Container,Nav,NavDropdown,Carousel } from 'react-bootstrap';
import {CSSTransition} from "react-transition-group"

function Notice(){

  return(
    <div>
      <h1>공지사항입니다.</h1>
      

    </div>
  )
}




export default Notice