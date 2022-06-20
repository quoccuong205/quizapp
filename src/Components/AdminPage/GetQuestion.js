import React, { useEffect } from "react";
import "antd/dist/antd.css";
import "./index.css";
import { useState } from "react";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getListQuestion, updateQuestion } from "../../redux/admin/action";

function GetQuestion() {
  const accessToken = useSelector(
    (state) => state.auth.auth.tokens.access.token
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListQuestion(accessToken));
  }, [accessToken]);
  const listQuestionAdmin = useSelector((state) => state.admin.listQuestion);
  const listQuestion = listQuestionAdmin.map((item) => ({
    key: item.id,
    question: item.question,
    answer1: item.answer1,
    answer2: item.answer2,
    answer3: item.answer3,
    answer4: item.answer4,
    correctanswer: item.correctanswer,
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
  const [data, setData] = useState(listQuestion);
  const [editingKey, setEditingKey] = useState("");

  const isEditing = (record) => record.key === editingKey;

  const edit = (record) => {
    form.setFieldsValue({
      question: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctanswer: "",
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

      let questionUpdate = { ...newData[index] };

      delete questionUpdate.key;

      let questionId = newData[index].key;
      dispatch(updateQuestion(accessToken, questionUpdate, questionId));
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "Question",
      dataIndex: "question",
      width: "20%",
      editable: true,
    },
    {
      title: "Answer 1",
      dataIndex: "answer1",
      width: "14%",
      editable: true,
    },
    {
      title: "Answer 2",
      dataIndex: "answer2",
      width: "14%",
      editable: true,
    },
    {
      title: "Answer 3",
      dataIndex: "answer3",
      width: "14%",
      editable: true,
    },
    {
      title: "Answer 4",
      dataIndex: "answer4",
      width: "14%",
      editable: true,
    },
    {
      title: "Correct Answer",
      dataIndex: "correctanswer",
      width: "14%",
      editable: true,
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

export default GetQuestion;
