import React from 'react';
import PropTypes from 'prop-types';

import Comment from './comment';

function Post({ data }) {
  return (
    <div id="post">
      <div className="header-post">
        <img src={data.author.avatar} alt="avatar" className="img-format" />
        <div className="data-post">
          <strong>{data.author.name}</strong>
          <small>{data.date}</small>
        </div>
      </div>
      <br />
      <p>{data.content}</p>
      {data.comments.map(comment => (<Comment key={comment.id} data={comment} />))}
    </div>
  );
};

Post.PropTypes = {
  data: PropTypes.shape({
    author: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    date: PropTypes.string.isRequired,
  }),
};

export default Post;
