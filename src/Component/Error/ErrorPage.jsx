import React from 'react';
import styles from './ErrorPage.module.css';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className={styles.container}>
      <div className={styles.errorText}>
        <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt="404" />
        <span>404 PAGE</span>
        <p className={styles.textA}>
          . The page you were looking for could not be found
        </p>
        

        <Link to="/" className={styles.back} style={{marginBottom:"400px"}}>
          ... Back to Home page
        </Link>
      </div>
    </div>
  );
};

export default Error404;
