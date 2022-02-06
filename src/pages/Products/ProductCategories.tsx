import React from "react";
import { Card, Form, Table, Input, Button, Space, Popconfirm } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import { delModel, loadModelAPI } from "../../services/productsCategories";
import { ColumnsType } from "antd/es/table/Table";
import { dalImg } from "../../utils/tool";

interface Query {
  name?: string;
  page: number;
}

const ProductsCategory = () => {
  const [list, setList] = useState<Array<IProductCategories.Category>>(
    new Array<IProductCategories.Category>()
  );
  const [total, setTotal] = useState<number>(0);
  const [query, setQuery] = useState<Query>({
    page: 1,
  });

  const loadData = () => {
    loadModelAPI(query).then((res) => {
      setList(res.data);
      setTotal(res.total);
    });
  };

  useEffect(() => {
    setQuery({
      page: 1,
    });
  }, []);
  useEffect(() => {
    loadData();
  }, [query]);

  const columns: ColumnsType<IProductCategories.Category> = [
    {
      title: "序号",
      render: (d: any, r: any, i: number) => {
        return i + 1;
      },
      align: "center",
      width: 80,
    },
    {
      title: "名字",
      dataIndex: "name",
      align: "center",
    },

    {
      title: "描述",
      dataIndex:"desc",
      align: "center",
    },
    {
      title: "主图",
      render: (v: IProductCategories.Category) => {
        return (
          <img
            style={{ width: "100px", maxHeight: "120px" }}
            alt={v.name}
            src={dalImg(v.coverImage)}
          />
        );
      },
      align: "center",
    },

    {
      title: "操作",
      align: "center",
      render(v: IProductCategories.Category) {
        return (
          <Space>
            <Button type="primary" icon={<EditOutlined />} />
            <Popconfirm
              title="是否确认删除"
              okText="是"
              cancelText="否"
              onConfirm={async () => {
                await delModel(String(v.id));
                loadData();
              }}
            >
              <Button type="primary" icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <Card title="商品管理">
      <Form
        layout="inline"
        onFinish={({ name }) => {
          if (name) {
            setQuery({
              name: name,
              page: 1,
            });
          } else {
            setQuery({ page: 1 });
          }
        }}
      >
        <Form.Item name="name">
          <Input placeholder="搜索" />
        </Form.Item>
        <Form.Item>
          <Button icon={<SearchOutlined />} type="primary" htmlType="submit" />
        </Form.Item>
      </Form>
      <Table
        bordered={true}
        dataSource={list}
        columns={columns}
        pagination={{
          total,
          showSizeChanger: false,
          onChange(page) {
            setQuery({ ...query, page });
          },
        }}
        style={{ marginTop: "10px" }}
      />
    </Card>
  );
};

export default ProductsCategory;
