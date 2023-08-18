import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import styles from './Dassh.module.css'
// import "bootstrap-icons/font/bootstrap-icons.css"
import { useSelector, useDispatch } from "react-redux";
import { Link } from 'react-router-dom';


function Dashnew() {
    
const user = useSelector((state) => state.userReducer.user);
  return (
    <div className='d-flex flex-column justify-content-between bg-danger w-52 text-white p-4 vh-100' >
        <div>
       


        <a href='d-flex align-items-center'>
            <i className='bi bi-bootstrap'></i>
            <span className='fs-4'>Sidebar</span>
        </a>
        <hr className='text-secondary mt-2'/>
        <ul className={`nav nav-pills flex-column p-0 m-0${styles.side}`}>
        {(user ?.urType=== "admin" || user?.urType==="seller") &&(     
        <li className={`nav-item p-1 ${styles.li}`}>
    <a href="" className='nav-link text-white'>
        <i className="bi bi-speedometer me-2 fs-5"></i>
        <span className='fs-5'>Dash</span>
    </a>

</li>)}

{(
             user?.urType==="admin") && (
<li className={`nav-item p-1 ${styles.li}`}>
    <a href="" className='nav-link text-white'>
    <i className="bi bi-info-square"></i>
        <span className='fs-5'>Product request</span>
    </a>

</li>)}
{(
             user?.urType==="seller" || user?. urType==="admin") &&(
<li className={`nav-item p-1 ${styles.li}`}>
    <a href="" className='nav-link text-white'>
    <i className="bi bi-clipboard2-data-fill"></i>
        <span className='fs-5'>Product</span>
    </a>

</li>)}
{(user?. urType==="admin") &&(
<li className={`nav-item p-1 ${styles.li}`}>
    <a href="" className='nav-link text-white'>
        <i className="bi bi-speedometer me-2 fs-5"></i>
        <span className='fs-5'>Seller order</span>
    </a>

</li>)}
{(user?. urType==="admin" || user?.urType==="seller") &&(
<li className={`nav-item p-1 ${styles.li}`}>
    <a href="" className='nav-link text-white'>
        <i className="bi bi-speedometer me-2 fs-5"></i>
        <span className='fs-5'>Order request</span>
    </a>

</li>)}
{( user?.urType==="seller")&&(
<li className={`nav-item p-1 ${styles.li}`}>
    <a href="" className='nav-link text-white'>
        <i className="bi bi-speedometer me-2 fs-5"></i>
        <span className='fs-5'>Withdraw</span>
    </a>

</li>)}
{( user?.urType==="admin")&&(
<li className={`nav-item p-1 ${styles.li}`}>
    <Link to="/productsection" className='nav-link text-white'>
        <i className="bi bi-speedometer me-2 fs-5"></i>
        <span className='fs-5'>Withdraw Details</span>
    </Link>

</li>)}
{(user?. urType==="admin") &&(
<li className={`nav-item p-1 ${styles.li}`}>
    <a href="" className='nav-link text-white'>
        <i className="bi bi-speedometer me-2 fs-5"></i>
        <span className='fs-5'>User management</span>
    </a>

</li>)}
{(user?. urType==="delivery") &&(
<li className={`nav-item p-1 ${styles.li}`}>
    <a href="" className='nav-link text-white'>
        <i className="bi bi-speedometer me-2 fs-5"></i>
        <span className='fs-5'>DeliveryDash</span>
    </a>

</li>)}

{(user?. urType==="delivery") &&(
<li className={`nav-item p-1 ${styles.li}`}>
    <a href="" className='nav-link text-white'>
        <i className="bi bi-speedometer me-2 fs-5"></i>
        <span className='fs-5'>Return orders</span>
    </a>

</li>)}
{(user?. urType==="admin") &&(
<li className={`nav-item p-1 ${styles.li}`}>
    <a href="" className='nav-link text-white'>
        <i className="bi bi-speedometer me-2 fs-5"></i>
        <span className='fs-5'>Return requests</span>
    </a>

</li>)}




        </ul>
        </div>
        <div>
            <hr className='text-secondary' />
            <i className="bi bi-people-fill me-2 fs-5"> Manu</i>
        </div>
      
        
      </div>
  )
}

export default Dashnew