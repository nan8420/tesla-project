import React, { useEffect, useState } from "react";
import Link from "next/link";

import PropTypes from "prop-types";
import { Form, Input } from "formik-antd";
import { Formik } from "formik";
import { Button, message } from "antd";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { EditOutlined, UndoOutlined } from "@ant-design/icons";

const SupportcontentSchema = Yup.object().shape({
  content: Yup.string()
    .min(5, "게시글은 5자 이상 입력하여 주십시오.")
    .required("게시글은 필수 입력 항목 입니다."),
});

const Supportcontent = ({ support, editMode }) => {
  console.log("support:", support);
  return <div>{support}</div>;
};

Supportcontent.propTypes = {
  postId: PropTypes.number.isRequired,
  support: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  onToggleChangePost: PropTypes.func.isRequired,
};

Supportcontent.defaultProps = {
  editMode: false,
};

export default Supportcontent;

// import React, { useEffect, useState } from "react";
// import Link from "next/link";

// import PropTypes from "prop-types";
// import { Form, Input } from "formik-antd";
// import { Formik } from "formik";
// import { Button, message } from "antd";
// import * as Yup from "yup";
// import { useDispatch, useSelector } from "react-redux";
// import { EditOutlined, UndoOutlined } from "@ant-design/icons";

// const SupportcontentSchema = Yup.object().shape({
//   content: Yup.string()
//     .min(5, "게시글은 5자 이상 입력하여 주십시오.")
//     .required("게시글은 필수 입력 항목 입니다."),
// });

// const Supportcontent = ({
//   postId,
//   postContent,
//   editMode,
//   onToggleChangePost,
// }) => {
//   const dispatch = useDispatch();
//   const [action, setAction] = useState(null);

//   return (
//     <div>
//       {editMode ? (
//         <Formik
//           initialValues={{ content: postContent }}
//           validationSchema={SupportcontentSchema}
//         >
//           <Form style={{ marginBottom: "20px" }}>
//             <Form.Item name="content">
//               <Input.TextArea
//                 name="content"
//                 maxLength={140}
//                 autoSize={{ minRows: 3, maxRows: 5 }}
//                 placeholder="내용?"
//               />
//             </Form.Item>
//             <Button.Group>
//               <Button htmlType="submit" loading={updatePostLoading}>
//                 <EditOutlined /> 수정
//               </Button>
//               <Button type="danger" onClick={onToggleChangePost}>
//                 <UndoOutlined /> 취소
//               </Button>
//             </Button.Group>
//           </Form>
//         </Formik>
//       ) : (
//         postContent.split(/(#[^\s#]+)/g).map((v, i) => {
//           if (v.match(/(#[^\s#]+)/g)) {
//             return (
//               <Link href={`/hashtag/${v.slice(1)}`} key={i}>
//                 <a>{v}</a>
//               </Link>
//             );
//           }
//           return v;
//         })
//       )}
//     </div>
//   );
// };

// Supportcontent.propTypes = {
//   postId: PropTypes.number.isRequired,
//   postContent: PropTypes.string.isRequired,
//   editMode: PropTypes.bool,
//   onToggleChangePost: PropTypes.func.isRequired,
// };

// Supportcontent.defaultProps = {
//   editMode: false,
// };

// export default Supportcontent;
