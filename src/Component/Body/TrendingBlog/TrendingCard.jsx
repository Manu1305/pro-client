import React from "react"
import Trending from "./Trending"
import "./Trending.css"

const TrendingCard = () => {
  return (
    <>
      <section className='flash'>
        <div className='container'>
          <div className='heading f_flex'>
            <i className='fa fa-bolt'></i>
            <h1>Flash Deals</h1>
          </div>
          <Trending productItems={productItems}  />
        </div>
      </section>
    </>
  )
}

export default TrendingCard