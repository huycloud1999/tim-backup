import Image from "next/image"
import Link from "next/link"
import logo from '../../../public/imgs/Group-1.png'
import search from '../../../public/imgs/search-icon.svg'
import dropdown from "../../../public/imgs/dropdown.svg"
import { useRef } from "react"
import { useRouter } from "next/router"
import { useEffect } from "react"

export const NewHeader = () => {

  const inputSearch = useRef()
  const router = useRouter();
  const menuNav = useRef()

  useEffect(() => {
    inputSearch.current?.classList.remove('open')

  }, [router.asPath]);


  useEffect(() => {

    var fakeScrollY = 0;
    window.addEventListener("scroll", function () {
      var thisScrollY = this.scrollY;

      if (menuNav.current) {
        if (thisScrollY > 20) {
          menuNav.current.style.background = 'white'
        } else {
          menuNav.current.style.background = 'rgba(255, 255, 255, 0.8)'

        }

      }

      fakeScrollY = thisScrollY
    });



    inputSearch.current.addEventListener('submit', function (e) {
      var searchKey = inputSearch.current.querySelector('input').value

      if (router.query.keyValue != searchKey) {
        e.preventDefault();

        router.push({
          pathname: '/search',
          query: {
            keyValue: searchKey,

          }
        })
      }


    })

    window.addEventListener('click', function (e) {
      if (document.querySelector('.search-input')) {

        if (!document.querySelector('.search-input').contains(e.target) && !document.querySelector('.search-img').contains(e.target)) {
          inputSearch.current?.classList.remove('open')

        } else {
        }
      }
    });





  })

  const toggleSearchInput = () => {
    if (inputSearch.current) {
      if (inputSearch.current.classList.contains('open')) {
        inputSearch.current.classList.remove('open')
      } else {
        inputSearch.current.classList.add('open')

      }
    }
  }

  return (
    <>
      <div className="menu-header " ref={menuNav}>
        <div style={{ position: 'relative' }}>
          <div className="container">

            <Link href='/'>
              <a className="logo-img image-container">
                <Image src={logo} layout='fill' alt='' className="image-item" />
              </a>
            </Link>

            <div className="menu-area">
              <Link href='/' className="menu-parent"><a className={"menu-parent " + (router.asPath == '/' ? 'active' : '')}>HOME</a></Link>
              <div className="menu-parent">
                <div className="menu-text">WHO WE ARE</div>
                <div className="dropdown-icon image-container">
                  <Image src={dropdown} alt='' className="image-item" />
                </div>
                <ul className="menu-list">
                  <li className={"menu-item " + (router.asPath == '/who-we-are/about-us' ? 'active' : '')}>
                    <Link className="menu-item" href={'/who-we-are/about-us'}><a> about us</a></Link>
                  </li>
                  <li className={"menu-item " + (router.asPath == '/who-we-are/firm-history' ? 'active' : '')}>
                    <Link className="menu-item" href={'/who-we-are/firm-history'}>firm history </Link>
                  </li>
                  <li className={"menu-item " + (router.asPath == '/who-we-are/our-approach' ? 'active' : '')}>
                    <Link className="menu-item" href={'/who-we-are/our-approach'}>  OUR APPROACH</Link>
                  </li>
                  <li className={"menu-item " + (router.asPath == '/who-we-are/our-team' ? 'active' : '')}>
                    <Link className="menu-item" href={'/who-we-are/our-team'}>OUR TEAM</Link>
                  </li>
                  <li className={"menu-item " + (router.asPath == '/who-we-are/careers' ? 'active' : '')}>
                    <Link className="menu-item" href={'/who-we-are/careers'}>CAREERS</Link>
                  </li>
                </ul>
              </div>
              <Link href='/why-vietnam' className="menu-parent"><a className={"menu-parent " + (router.asPath == '/why-vietnam' ? 'active' : '')}>Why Vietnam</a></Link>
              <Link href='/products' className="menu-parent"><a className={"menu-parent " + (router.asPath == '/products' ? 'active' : '')}>OUR SERVICES</a></Link>
              <Link href='/news' className="menu-parent"><a className={"menu-parent " + (router.asPath == '/news' ? 'active' : '')}>News & Insights</a></Link>
              <Link href='/get-in-touch' className="menu-parent"><a className={"menu-parent " + (router.asPath == '/get-in-touch' ? 'active' : '')}>Get in touch</a></Link>
            </div>

            <div className="search-img image-container" onClick={toggleSearchInput}>
              <Image src={search} layout='fill' alt='' className="image-item" />
            </div>
          </div>
          <form className="search-input" ref={inputSearch}>
            <div className="container">
              <input type="text" name="search" id="search" placeholder="Type to search..." />
            </div>
          </form>

        </div>
      </div>
    </>
  )
}