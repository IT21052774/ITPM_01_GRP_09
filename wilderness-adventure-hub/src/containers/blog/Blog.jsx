import React, { useEffect } from 'react';
import Article from '../../components/article/Article';

import './blog.css';

const Blog = ({ data, title1, title2, id }) => (
  <div className="gpt3__blog section__padding" id={id}>
    <div className="gpt3__blog-heading">
      <h1 className="gradient__text">{title1}, <br />{title2}</h1>
    </div>
    <div className="gpt3__blog-container">
      <div className="gpt3__blog-container_groupA">
        {data.length > 0 && <Article imgUrl={data[0].image} date="Sep 26, 2023" d={data[0].description} text={data[0].name} />}
      </div>
      <div className="gpt3__blog-container_groupB">
        {data.length > 0 &&
          data.filter((p) => {
            return p._id !== data[0]._id
          }).map((post, index) => {
            return <Article

              d={post.description}
              text={post.name}
              price={post.price}
              imgUrl={post.image ?? "https://www.shutterstock.com/shutterstock/videos/1089782287/thumb/4.jpg?ip=x480"}
              date={"2023-08-18"}
              key={p._id} />
          })
        }

      </div>
    </div>
  </div>
);

export default Blog;
