import React from "react";
import {
  Card,
  Form,
  Table,
  Input,
  Button,
  Space,
  Popconfirm,
  Modal,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useState, useEffect } from "react";
import {
  delModel,
  insertModel,
  loadModelAPI,
  modifyModel,
} from "../../services/productsCategories";
import { ColumnsType } from "antd/es/table/Table";
import { dalImg } from "../../utils/tool";
import { useForm } from "antd/es/form/Form";
import FileUpload from "../../components/Upload";

interface Query {
  name?: string;
  page: number;
}

interface Category {
  name: string;
  desc: string;
}

const ProductsCategory = () => {
  const [list, setList] = useState<Array<IProductCategories.Category>>(
    new Array<IProductCategories.Category>()
  );
  const [total, setTotal] = useState<number>(0);
  const [query, setQuery] = useState<Query>({
    page: 1,
  });
  const [editForm] = useForm();
  const [currentID, setCurrentID] = useState<number>(-1);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [imgUrl, setImgUrl] = useState<string>();

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

  useEffect(() => {
    if (!isShow) {
      editForm.resetFields();
      setCurrentID(-1);
      setImgUrl("");
    }
  }, [isShow]);
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
      dataIndex: "desc",
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
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() => {
                setCurrentID(v.id);
                setImgUrl(v.coverImage);
                setIsShow(true);
                editForm.setFieldsValue(v);
              }}
            />
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
    <Card
      title="商品管理"
      extra={
        <>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsShow(true);
              editForm.resetFields();
            }}
          />
        </>
      }
    >
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

      <Modal
        title="编辑"
        visible={isShow}
        onCancel={() => setIsShow(false)}
        maskClosable={false}
        cancelText="取消"
        okText="确认"
        onOk={() => {
          editForm.submit();
        }}
      >
        <Form
          form={editForm}
          onFinish={async (v: Category) => {
            if (currentID === -1)
              await insertModel({ ...v, coverImage: imgUrl });
            else
              await modifyModel(String(currentID), {
                ...v,
                coverImage: imgUrl,
              });
            setCurrentID(-1);
            setIsShow(false);
            loadData();
          }}
        >
          <Form.Item
            label="名字"
            name="name"
            rules={[{ required: true, message: "名字不能为空" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="描述"
            name="desc"
            rules={[{ required: true, message: "描述不能为空" }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="主图" style={{ marginLeft: "12px" }}>
            <FileUpload imgUrl={imgUrl} setImgUrl={setImgUrl} />
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default ProductsCategory;
