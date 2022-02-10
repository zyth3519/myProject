import { useState, useEffect } from "react";
import { Carousel } from "antd";

import { getBannersAPI } from "../services/bannersAPI";
import { dalImg } from "../utils/tool";

function MyBanner() {
  const [list, setList] = useState([]);

  const contentStyle = {
    height: "360px",
    width: "900px",
    margin: "auto",
  };

  useEffect(() => {
    getBannersAPI({}).then((res: any) => {
      setList(res.data);
    });
  }, []);

  return (
    <Carousel autoplay>
      {list.map((item: any) => (
        <div key={item.id}>
          <img
            src={dalImg(item.coverImage)}
            // rowKey="item.id"
            style={contentStyle}
          />
        </div>
      ))}
    </Carousel>
  );
}

export default MyBanner;
