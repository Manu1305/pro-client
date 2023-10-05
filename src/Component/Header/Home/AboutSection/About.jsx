import React from 'react'
import styles from './About.module.css'
import { Footer } from '../../../Footer/Footer'
import Imgg1 from "../../../../images/Aboutus/2nd.png"
import Flip from 'react-reveal/Flip'
import LightSpeed from 'react-reveal/Flip'
import Fade from 'react-reveal/Fade'
import Bounce from 'react-reveal/Bounce';
import Jello from 'react-reveal/Jello';
import Zoom from 'react-reveal/Zoom';
import Rotate from 'react-reveal/Rotate';

function AboutUs() {
  return (
    <div>
      
      <div className={styles.main}>
      <Fade top>
     <h1 className={styles.aboutustext}>ABOUT US</h1>

     </Fade>
<div className={styles.headingcontentfirst}>

<Fade right  >
<h1 className={styles.Headingtextfirst}>Top b2b portal in india</h1>
</Fade>
<Fade right  >
<h3 className={styles.contenttextfirst}>Welcome to hitecmart - the largest b2b portal . We connect Manufactures to wholesale and retailers for Bulk <br/>
Business. We always give top priority to our customers and we are committed to serving you the best quality <br/>
Products available in the market to flourish your bussiness to the next level.  </h3>

</Fade>
</div>
      </div>
      
      <div className={styles.main1}>
            <div >
                  <img src={Imgg1} className={styles.secndimg} alt="img" />
            </div>
            
<div className={styles.headingcontent1}>

      
<Fade right  >
<h1 className={styles.Headingtext}>Transform your bussiness plan into reality</h1>

</Fade>
<Fade right  >

<h3 className={styles.contenttext}>HiTec Mart is a leading b2b clothing wholesale suppliers . We are cimmitted to providing <br/>
affordable and quality products to bussinesses. Our goal is to make it easier in businesses to access a wide range of clothing and <br/>
footwear options at competitive prices and hassle-free soursing to their doorstep. 

</h3>
</Fade>
<Fade right  >

<h3 className={styles.contenttext}>Our platform brings together manufactures, suppliers ,and retailers,to offer a seamless shopping experience for bussinesses looking to
<br/> purchase garments and footwear in bulk.With our extensive network ,we ensure that our customers have access to latest styles <br/>
support of our brand and network.
</h3>
</Fade>
<Fade right >

<h3 className={styles.contenttext}>We,the B2B wholesale  marketplace are always striving to expand our reach,and that's why we are proud to offer Hitecmart franchise <br/>
opportunities. Our franchise program is designed to help entrepreneurs establish their own Hitec mart store,and benefit from the <br/>
support of our brand network.
</h3>
</Fade>
<Fade right >

<h3 className={styles.contenttext}>
At Hitec Mart, we understand the importance of providing bussinesses with not just quality products, but also exceptional customer 
<br/>service. Our team is dedicated to ensuring that each customer's experience is seamless and that their needs are met efficiently and <br/>
effectively
</h3>
</Fade>

</div>

      </div>
     
      <div className={styles.main3}>
     
    

      <Zoom bottom>
     <div className={styles.ourmission}>

     <h1 className={styles.Headingtextdef}>Our Mission</h1>
     <h3 className={styles.contenttextdef}>Our mission to create a sustainable and inclusive fashion <br/> 
     ecosystem in b2b marketplace that drive economic growth <br/> 
     and borderless transaction from a grolbal perspective
     </h3>
  
     
     </div>
     </Zoom>
           </div>


           <Bounce right cascade>
           <div className={styles.lastmaindiv} >
           <div className={styles.mainvision}>
   
           </div>
           <Rotate bottom right>
           <div className={styles.ourvision}>
     
     <h1 className={styles.Headingtextlast}>Our Vision</h1>
     <h3 className={styles.contenttextlast}>Our vision to become a giant in the global B2B marketplace by <br/>
     serving our clients the best shopping experience available today in <br/>
     the market.
     </h3>
  
     
     </div> </Rotate>
    
           </div> </Bounce>
           <Footer />
      </div>
  )
}

export default AboutUs