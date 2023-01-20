import React from 'react';
import * as styles from './BlogPreviewGrid.module.css';

import BlogPreview from '../BlogPreview';
import config from "../../config.json"

const BlogPreviewGrid = (props) => {
  const { data, hideReadMoreOnWeb, showExcerpt } = props;
  return (
    <div className={styles.root}>
      {data &&
        data.map((blog, index) => {
          return (
            <BlogPreview
              key={index}
              image={`${config.STRAPI_API_URL}${blog.preview.url}`}
              altImage={blog.alt || ""}
              title={blog.title}
              link={blog.link || ""}
              category={blog.category || ""}
              excerpt={blog.excerpt || ""}
              hideReadMoreOnWeb={hideReadMoreOnWeb}
              showExcerpt={showExcerpt}
            />
          );
        })}
    </div>
  );
};

export default BlogPreviewGrid;
