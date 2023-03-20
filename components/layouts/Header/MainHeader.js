import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router"
import Image from "next/image";
import Modal from "react-modal";
import gsap from "gsap";
import Link from "next/link";

import { Dropdown } from "./Dropdown";

import logoIcon from "../../../public/imgs/Group-1.png";
import searchIcon from "../../../public/imgs/search-icon.svg";
import menuIcon from "../../../public/imgs/Group 36950.png";
import close from "../../../public/imgs/close.svg";
import { Button } from "../Button"


export const Header = ({ data }) => {

  const menuNav = useRef();
  const formSearch = useRef()
  const formSearchIcon = useRef()
  const closeformSearchIcon = useRef()
  const [isSearching,setSearching] = useState(false)
  const router = useRouter();
  const formIsOpen = useRef(false)


  useEffect(() => {
    if (modalIsOpen) {
      setIsOpen(!modalIsOpen);
    };
    closeForm()

  }, [router.asPath]);


  const [modalIsOpen, setIsOpen] = useState(false);


  useEffect(() => {
    if (menuNav.current !== undefined) {
      menuNav.current.style.background = modalIsOpen ? "white" : "transparent";

    }

  }, [modalIsOpen]);
  

  useEffect(() => {




    var fakeScrollY = 0;
    window.addEventListener("scroll", function () {
      var thisScrollY = this.scrollY;

      if (menuNav.current){
        if (!modalIsOpen) {
          if (this.scrollY > 0) {
            menuNav.current.style.background = "rgba(255,255,255,1)";
         
          } else {

            menuNav.current.style.background = "transparent";
          }
  
          if (fakeScrollY > thisScrollY) {
  
            menuNav.current.style.transform = "translateY(0%)"
  
          }
  
          if (fakeScrollY < thisScrollY && thisScrollY > 300) {
  
            menuNav.current.style.transform = "translateY(-100%)"
  
          }
  
          if (fakeScrollY == thisScrollY)
  
            if (thisScrollY == 0) {
              menuNav.current.style.transform = "translateY(0%)"
            }
  
        } else {
          menuNav.current.style.background = "white";
          menuNav.current.style.transform = 'translateY(0%)'
        }

      }
      fakeScrollY = thisScrollY
    });
   




    formSearch.current.addEventListener('submit', function (e) {
      var searchKey = document.querySelector('#search').value
      
      if (router.query.keyValue != searchKey){
        e.preventDefault();
        // setSearching(true)
        formSearch.current.classList.add('isLoadingSlow')
     
        router.push({
          pathname:'/search',
          query:{
            keyValue:searchKey,
            
          }
        })
       }
      
      
    })


    return () => {
      window.removeEventListener('scroll', function () { })
      window.removeEventListener('click', function () { })
      formSearch.current?.removeEventListener('submit', function () { })
    }
  })

  function handleClick() {
    if (modalIsOpen) {
      closeModal();
    } else openModal();
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }


  function openForm() {
    var mediaQuery = window.matchMedia('(max-width: 768px)')
    if (mediaQuery.matches) {
      var input = document.querySelector('.form-search .input')
      input.classList.add('fixed-search')
    } else {


      gsap.to('.form-search input', {
        width: 294,
        duration: 0.5,
        borderWidth: 1
      })
      gsap.to('.search-icon .icon', {
        width: 16,
        height: 16,
        marginRight: 10,
        duration: 0.5,

      })
      gsap.to('.form-search', {

        duration: 0.5,
        borderWidth: 1,

      })
      closeformSearchIcon.current.style.width = 'auto'
    }
    formIsOpen.current = true
  }


  function closeForm() {
    var mediaQuery = window.matchMedia('(max-width: 768px)')
    if (mediaQuery.matches) {
      var input = document.querySelector('.form-search .input')
      input.classList.remove('fixed-search')
    } else {
      gsap.to('.form-search input', {
        width: 0,
        duration: 0.5,
        borderWidth: 0
      });
      gsap.to('.search-icon .icon', {
        width: 24,
        height: 24,
        marginRight: 0,
        duration: 0.5,

      })
      gsap.to('.form-search', {

        duration: 0.5,
        borderWidth: 0
      });
      closeformSearchIcon.current.style.width = 0
    }
    formIsOpen.current = false
  }

  function handleIconSearchClick() {
    var mediaQuery = window.matchMedia('(max-width: 768px)')
    if (mediaQuery.matches) {
      if (!formIsOpen.current) {
        openForm()
      } else closeForm()
    } else {
      if (!formIsOpen.current) {
        openForm()
      } else {

        var searchKey = document.querySelector('#search').value
        formSearch.current.classList.add('isLoadingSlow')
        router.push({
          pathname:'/search',
          query:{
            keyValue:searchKey,
            
          }
        })

      }
    }


  }


  return (
    <div  className="menu-container">
      <div className="main-header">
        <div ref={menuNav} className="navigation-menu">
          <div className="container">
            <div className="menu-icon" onClick={handleClick}>
              <div className="menu-wrap">
                <div className="icon">
                  <Image src={menuIcon} alt="menu_icon" />
                </div>
                <div className="text">MENU</div>

              </div>
            </div>

            <div className="logo">
              <Link href="/">
                <a>
                  <Image src={logoIcon} alt="logo_icon" />
                </a>
              </Link>
            </div>

            <div className= "search-icon aa">
              <form action="" className="form-search" ref={formSearch}>
                <div className="icon" ref={formSearchIcon} onClick={handleIconSearchClick} >
                  <Image src={searchIcon} alt="search_icon" />
                </div>
                <div className="input">

                  <input type="text" name="search" id="search" placeholder="Type to search..." />
                  <button type="submit">Search</button>
                </div>

                <div className="icon-close" ref={closeformSearchIcon} onClick={closeForm} >

                  <Image src={close} alt="close_icon" />
                </div>
              </form>
            </div>
          </div>
        </div>

        {modalIsOpen && <Dropdown data={data} functionOnClick={handleClick} />}
      </div>
    </div>
  );
};
