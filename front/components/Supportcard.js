import React, { useState, useEffect } from "react";
import { Card, message, Tooltip } from "antd";
import PropTypes from "prop-types";
import moment from "moment";
// import Supportcontent from "./Supportcontent";

import styled from "styled-components";

const Nickname = styled.div`
  margin-right: 20px;
  font-size: 13px;
`;

const SubjectLine = styled.div`
  display: flex;
`;

const Subject = styled.div`
  margin: 5px 0 3px 0;

  span {
    font-size: 13px;
    font-weight: bold;
  }
`;

moment.locale("ko");

const Supportcard = ({ post }) => {
  const [editMode, setEditMode] = useState(false);

  return (
    <div style={{ marginBottom: 20, border: "0.3px solid lightgrey" }}>
      <Card>
        <Card.Meta
          title={
            <div>
              <SubjectLine>
                <Nickname>{post.User.nickname}</Nickname>
                <Tooltip
                  title={moment(post.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                >
                  <span
                    style={{
                      color: "#ccc",
                      marginLeft: "10px",
                      marginTop: "3px",
                      fontSize: "12px",
                    }}
                  >
                    {moment(post.createdAt).fromNow()}
                  </span>
                </Tooltip>
              </SubjectLine>
              <Subject>
                <span>제목: &nbsp; {post.subject}</span>
              </Subject>
            </div>
          }
          description={
            <div style={{ padding: "10px" }}>{post.content}</div>
            // <Supportcontent
            //   postId={post.id}
            //   support={post.content}
            //   editMode={editMode}
            // />
          }
        />
      </Card>
    </div>
  );
};

Supportcard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    User: PropTypes.shape({
      id: PropTypes.number.isRequired,
      nickname: PropTypes.string.isRequired,
    }),
    content: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    Comments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
      })
    ),
    Images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired,
      })
    ),
    Likers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
      })
    ),
  }).isRequired,
};

export default Supportcard;
