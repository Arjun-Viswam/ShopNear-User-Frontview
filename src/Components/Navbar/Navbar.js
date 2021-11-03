import React,{ useState ,useEffect } from "react";
import Cookies from "universal-cookie";
import "./Navbar.css";

function Navbar() {
  let Cookie = new Cookies()
  const [User, setUser ] = useState(false)

  let firstname = localStorage.getItem('firstname')
  let lastname = localStorage.getItem('lastname')
  let displayName = localStorage.getItem('displayName')
  useEffect(()=>{
    if(Cookie.get("token")){
      if(firstname && lastname){
      userName()
      }else if(displayName){
        authUser()
      }else {
        unIdentified()
      }
    }
  })
  function userName(){
    setUser(firstname+' '+lastname)
  }
  function authUser(){
    setUser(displayName)
  }
  function unIdentified(){
    setUser("user name")
  }
  const Logout = ()=>{
    Cookie.remove("token")
    localStorage.clear()
    window.location.href = "/login"
  }

  return (
    <div>
      <div className="nav">
        <input type="checkbox" id="nav-check" />
        <div className="nav-header">
          <div className="nav-title">ShopNear.</div>
        </div>
        <div className="nav-btn">
          <label htmlFor="nav-check">
            <span></span>
            <span></span>
            <span></span>
          </label>
        </div>

        <div className="nav-links">
          {User?
          <a className="accName" href="//" target="_blank">
            {User}
          </a>
          :
          <a className="accName" href="//" target="_blank">
            Account
          </a>
          }
          <a href="//" target="_blank">
            Home
          </a>
          <a href="http://" target="_blank">
            Shops
          </a>
          <a href="https://" target="_blank">
            Contact
          </a>
          <a href="https://" target="_blank">
            About
          </a>
          <div className="cartIcon">
            <a href="https://" target="_blank">
              <i
                className="fas fa-shopping-cart"
                style={{ color: "rgba(255, 238, 0, 0.849)" }}
              ></i>
            </a>
          </div>
        </div>
        
        <div style={{color:'white',marginTop:'10px'}}  className="dropdown  ">
        <a
          className="AccountName"
          style={{ color: "rgba(255, 238, 0, 0.849)", textDecoration: "none" }}
          href="https://"
        >
          <i style={{marginRight:'10px',marginTop:'4px'}} class="fas fa-user "></i> 
         {User?<a> {User}</a>:" Account"} 
        </a>
        <div class="dropdown-content  ">
          {User?
         <a style={{cursor:"pointer",color:'black',textAlign:'center'}} onClick={Logout}>Logout</a>
         :
         <a href="/login">Login</a>
          }
        </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
