import React, { useEffect } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Table,
  Typography,
  Avatar,
  Popconfirm,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getListUser, updateUser } from "../../redux/admin/action";

function GetUsers() {
  const accessToken = useSelector(
    (state) => state.auth.auth.tokens.access.token
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListUser(accessToken));
  }, [accessToken]);
  const listUserAdmin = useSelector((state) => state.admin.listUser);
  const listUser = listUserAdmin.map((user) => ({
    key: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    score: user.score,
    avatar: user.avatar,
  }));
  const EditableCell = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{
              margin: 0,
            }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };
  const [form] = Form.useForm();
  const [data, setData] = useState(listUser);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      username: "",
      email: "",
      role: "",
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey("");
  };

  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }

      let userInfor = { ...newData[index] };

      delete userInfor.key;
      delete userInfor.score;

      let userId = newData[index].key;
      dispatch(updateUser(accessToken, userInfor, userId));
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "20%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
      editable: true,
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      width: "15%",
      editable: true,
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
      width: "10%",
      sorter: (a, b) => a.score.length - b.score.length,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      width: "15%",
      render: (avatar) => (
        <Avatar
          src={avatar}
          size={{
            xs: 24,
            md: 40,
            xl: 60,
          }}
        />
      ),
    },
    {
      title: "Operation",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <span>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Edit
            </Typography.Link>
            <Typography.Link
              style={{ marginLeft: "50px" }}
              // disabled={editingKey !== ""}
              // onClick={() => edit(record)}
            >
              Delete
            </Typography.Link>
          </span>
        );
      },
    },
  ];
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div>
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </div>
  );
}

export default GetUsers;
