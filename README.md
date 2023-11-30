# Dự Án Chatbot Xử Lý Tin Nhắn Tự Động

## Mô Tả Tổng Quan:

Dự án này là một hệ thống chatbot đơn giản nhằm xử lý tin nhắn từ người dùng và cung cấp câu trả lời tự động. Ứng dụng cho phép người dùng đăng nhập, gửi tin nhắn, và nhận phản hồi từ chatbot.

## Chức Năng Chính:

1. **Đăng Nhập và Xác Thực:**
   - Người dùng có thể đăng nhập để bắt đầu gửi tin nhắn.
   - Sử dụng JSON Web Token (JWT) để xác thực người dùng.

2. **Gửi và Nhận Tin Nhắn:**
   - Gửi tin nhắn từ người dùng đến server để xử lý.
   - Nhận câu trả lời từ chatbot và hiển thị trong giao diện người dùng.

3. **Giao Diện Người Dùng Thân Thiện:**
   - Giao diện người dùng dễ sử dụng và thân thiện.
   - Hỗ trợ chủ đề sáng và tối.

## Công Nghệ và Công Cụ Sử Dụng:

- **Frontend:**
  - React.js
  - Ant Design (UI framework)

- **Backend:**
  - Node.js
  - Express.js (Web framework)
  - MongoDB (Database)
  - Rasa (Chatbot framework)

## Cài Đặt và Chạy Dự Án:

1. Clone dự án từ GitHub:
   ```bash
   git clone https://github.com/your-username/chatbot-project.git
2. Di chuyển vào thư mục dự án:
   ```bash
   cd chatbot-project
3. Cài đặt các dependencies:
   ```bash
   npm install
4. Chạy frontend và backend cùng một lúc:
   ```bash
   npm run dev
5. Truy cập ứng dụng trong trình duyệt tại địa chỉ: http://localhost:3000
   
