import React, { useState, memo } from "react";

import { Upload, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { uploadUrl, dalImg } from "../utils/tool";
import { UploadChangeParam } from "antd/es/upload";

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

interface MyUploadProp {
  imgUrl: string | undefined;
  setImgUrl: (url: string) => void;
}

const FileUpload = ({ imgUrl, setImgUrl }: MyUploadProp) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      setImgUrl(info.file.response.data);
      setLoading(false);
      return;
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Upload
      name="file"
      listType="picture-card"
      className="avatar-uploader"
      showUploadList={false}
      action={uploadUrl}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {imgUrl ? (
        <img src={dalImg(imgUrl)} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default memo(FileUpload);
