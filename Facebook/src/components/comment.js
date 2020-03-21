import React from 'react';
import PropTypes from 'prop-types';

function Comment({ data }) {
  return (
    <div id="comment">
      <img src={data.author.avatar} alt="avatar" className="img-format" />
      <p><strong>{data.author.name}</strong>{data.content}</p>
    </div>
  );
};

Comment.PropTypes = {
  data: PropTypes.shape({
    author: PropTypes.shape({
      avatar: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }),
};

export default Comment;
