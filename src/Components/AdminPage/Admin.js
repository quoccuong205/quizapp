import {
  FolderOpenOutlined,
  UserOutlined,
  UserAddOutlined,
  ReadOutlined,
  FolderOutlined,
  FolderAddOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getListQuestion, getListUser } from "../../redux/admin/action";
import Navbar from "../StartPage/Navbar";

const { Header, Sider, Content } = Layout;

function Admin() {
  const userName = useSelector((state) => state.auth?.auth?.user?.username);
  const accessToken = useSelector(
    (state) => state.auth.auth.tokens.access.token
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleUsers = () => {
    dispatch(getListUser(accessToken));
    navigate("/admin/getusers");
  };
  const handleQuestions = () => {
    console.log(accessToken);
    dispatch(getListQuestion(accessToken));
    navigate("/admin/getquestions");
  };

  return (
    <div>
      <Navbar />
      <Layout>
        <Sider trigger={null} theme="light">
          <Menu theme="light" mode="inline">
            <Menu.SubMenu key="1" icon={<FolderOpenOutlined />} title="User">
              <Menu.Item key="u1" icon={<UserOutlined />} onClick={handleUsers}>
                Get User
              </Menu.Item>
              <Menu.Item
                key="u2"
                icon={<UserAddOutlined />}
                onClick={() => navigate("/admin/createuser")}
              >
                Create User
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.SubMenu key="2" icon={<ReadOutlined />} title="Question">
              <Menu.Item
                key="q1"
                icon={<FolderOutlined />}
                onClick={handleQuestions}
              >
                Get Questions
              </Menu.Item>
              <Menu.Item
                key="q2"
                icon={<FolderAddOutlined />}
                onClick={() => navigate("/admin/createquestion")}
              >
                Create Question
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Sider>
        <Layout>
          <Content
            style={{
              margin: "16px 16px",
              padding: 24,
              minHeight: 280,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default Admin;
