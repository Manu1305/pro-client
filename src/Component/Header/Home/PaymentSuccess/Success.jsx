import React from 'react'
import styles from './Success.module.css'
import {MdDoneOutline} from 'react-icons/md'
function Success() {
  return (
    <div className={styles.main}>


        <div className={styles.centerdiv}>


<div className={styles.tick}>
<MdDoneOutline className='h-6 w-6'/>

</div>
<div>
   <h1 className='text-green-500'>
   Payment successfull
    </h1>
    <br/>
    <br/>
    <h3>
        transaction number: 232323232323
    </h3>
    <br />
    <br />
    <br />
    <h3>
       Amount paid: 2323
    </h3>
</div>

        </div>
    </div>
  )
}

export default Success