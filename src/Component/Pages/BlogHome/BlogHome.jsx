import React from "react";
import { Category } from "../../Blog/Category/Category";
import { Card } from "../../Blog/MainBlog/Card";
 const BlogHome = () => {
  return (
    <div>
      <Category />
      <div className="container">
        <div className="row">
            <div className="col">   <Card /></div>
        </div>
     
      </div>
    </div>
  );
};
export default BlogHome;
