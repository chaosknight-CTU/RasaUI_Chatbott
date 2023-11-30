import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Button, Input, Space, Menu, Switch, Card, Avatar } from "antd";
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import setAuthToken from "../utils/setAuthToken";

const { SubMenu } = Menu;

const ChatContainer = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [theme, setTheme] = useState("light"); // Default to dark mode
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (!token) {
      navigate("/login");
      return;
    }

    setAuthToken(token);

    // Fetch messages on component mount
    fetchMessages();
  }, [navigate]);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const messagesData = await getMessages();
      setMessages(messagesData);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const getMessages = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/message/messages"
      );
      if (response.data.success) {
        return response.data.messages;
      }
    } catch (error) {
      messages.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e.target.value);
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/message/send",
        {
          userQuestion: newMessage,
        }
      );
      setMessages((prev) => [...prev, response.data]);
      setNewMessage("");
    } catch (error) {
      messages.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setAuthToken(null);
    localStorage.clear();
    navigate("/login");
  };

  const onClick = (e) => {
    console.log("click ", e);
    setTheme("light"); // Set light mode when clicking on the menu items
  };

  // Apply styles to the entire browser
  const bodyStyle = {
    display: "flex",
    background: theme === "dark" ? "#001529" : "#fff",
    color: theme === "dark" ? "#fff" : "#000",
    minHeight: "100vh", // Ensure the content takes at least the full height of the viewport
  };

  const menuStyle = {
    width: "256px",
    marginRight: "20px",
  };

  const contentStyle = {
    flex: 1,
  };

  return (
    <div style={bodyStyle}>
      {/* Left side: Menu */}
      <div style={menuStyle}>
        <br />
        <br />
        <Menu
          theme={theme}
          onClick={onClick}
          defaultOpenKeys={["sub1"]}
          selectedKeys={[]}
          mode="inline"
        >
          <SubMenu key="sub1" icon={<MailOutlined />} title="Navigation One">
            <Menu.Item key="1">Option 1</Menu.Item>
            <Menu.Item key="2">Option 2</Menu.Item>
            <Menu.Item key="3">Option 3</Menu.Item>
            <Menu.Item key="4">Option 4</Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            icon={<AppstoreOutlined />}
            title="Navigation Two"
          >
            <Menu.Item key="5">Option 5</Menu.Item>
            <Menu.Item key="6">Option 6</Menu.Item>
            <SubMenu key="sub3" title="Submenu">
              <Menu.Item key="7">Option 7</Menu.Item>
              <Menu.Item key="8">Option 8</Menu.Item>
            </SubMenu>
          </SubMenu>
          <SubMenu
            key="sub4"
            icon={<SettingOutlined />}
            title="Navigation Three"
          >
            <Menu.Item key="9">Option 9</Menu.Item>
            <Menu.Item key="10">Option 10</Menu.Item>
            <Menu.Item key="11">Option 11</Menu.Item>
            <Menu.Item key="12">Option 12</Menu.Item>
          </SubMenu>
        </Menu>
      </div>

      {/* Right side: Content */}
      <div style={contentStyle}>
        <Button
          type="primary"
          onClick={handleLogout}
          style={{ marginBottom: "20px", marginTop: "10px" }}
        >
          Logout
        </Button>

        <div
          style={{
            height: "70vh",
            overflowY: "auto",
            border: "1px solid #ccc",
            padding: "10px",
            position: "relative",
            borderRadius: 10,
          }}
          ref={containerRef}
        >
          <div
            style={{
              right: "20px",
              bottom: "0",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {messages.map((message) => (
              <div key={message._id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "end",
                    margin: "10px 0",
                    gap: 5,
                  }}
                >
                  <div
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      width: "fit-content",
                      background: "#1677ff",
                      color: "#fff",
                    }}
                  >
                    {message.userQuestion}
                  </div>

                  <Avatar src="https://static.vecteezy.com/system/resources/thumbnails/009/749/656/small/male-profile-mascot-illustration-man-avatar-icon-cartoon-face-business-user-logo-free-vector.jpg" />
                </div>

                {/* Bot answer */}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "start",
                    margin: "10px 0",
                    gap: 5,
                  }}
                >
                  <Avatar src="https://cdn-icons-png.flaticon.com/512/4944/4944377.png" />

                  <div
                    style={{
                      padding: 10,
                      border: "1px solid #ddd",
                      borderRadius: 10,
                      width: "fit-content",
                      background: "#ddd",
                    }}
                  >
                    {message.botAnswer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={sendMessage}>
          <Space.Compact
            style={{
              width: "100%",
            }}
          >
            <Input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={handleInputChange}
              style={{ marginTop: "10px" }}
            />
            <Button
              type="primary"
              style={{ marginTop: "10px" }}
              htmlType="submit"
              loading={isLoading}
            >
              Send
            </Button>
          </Space.Compact>
        </form>
      </div>
    </div>
  );
};

export default ChatContainer;
