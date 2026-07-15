# 🚀 Employee Management System (EMS) - Backend

A modern Employee Management System backend built with **Java 21**, **Spring Boot**, **Spring Security**, **JWT Authentication**, and **PostgreSQL**. The project provides secure REST APIs for managing employees, departments, leave requests, and user authentication.

---

## 📌 Features

### 🔐 Authentication
- User Registration
- User Login
- JWT Authentication
- Role-Based Authorization
- Password Encryption using BCrypt
- Secure REST APIs

### 👨‍💼 Employee Management
- Add Employee
- Update Employee
- Delete Employee
- Get Employee by ID
- View All Employees
- Search Employees

### 🏢 Department Management
- Add Department
- Update Department
- Delete Department
- View Departments

### 📅 Leave Management
- Apply Leave
- Approve Leave
- Reject Leave
- View Leave History

### ✅ Validation & Security
- Bean Validation
- Exception Handling
- Global Exception Handler
- Spring Security
- JWT Token Authentication

---

# 🛠️ Tech Stack

| Technology | Version |
|------------|----------|
| Java | 21 |
| Spring Boot | 3.x |
| Spring Security | Latest |
| Spring Data JPA | Latest |
| Hibernate | Latest |
| PostgreSQL | Latest |
| Maven | Latest |
| JWT | Latest |
| Lombok | Latest |
| Swagger/OpenAPI | Latest |

---

# 📂 Project Structure

```
employee-management-system

src
 ├── controller
 ├── service
 ├── repository
 ├── entity
 ├── dto
 ├── security
 ├── config
 ├── exception
 ├── util
 └── EmployeeManagementApplication.java
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/employee-management-system.git
```

Move into the project directory.

```bash
cd employee-management-system
```

---

## Configure Database

Create a PostgreSQL database.

```sql
CREATE DATABASE ems;
```

Update `application.properties`.

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/ems
spring.datasource.username=postgres
spring.datasource.password=your_password
```

---

## Build Project

```bash
mvn clean install
```

---

## Run Project

```bash
mvn spring-boot:run
```

Application will start on:

```
http://localhost:8080
```

---

# 📖 API Endpoints

## Authentication

| Method | Endpoint |
|----------|----------|
| POST | /api/auth/register |
| POST | /api/auth/login |

---

## Employees

| Method | Endpoint |
|----------|----------|
| GET | /api/employees |
| GET | /api/employees/{id} |
| POST | /api/employees |
| PUT | /api/employees/{id} |
| DELETE | /api/employees/{id} |

---

## Departments

| Method | Endpoint |
|----------|----------|
| GET | /api/departments |
| POST | /api/departments |
| PUT | /api/departments/{id} |
| DELETE | /api/departments/{id} |

---

## Leave

| Method | Endpoint |
|----------|----------|
| GET | /api/leaves |
| POST | /api/leaves |
| PUT | /api/leaves/{id}/approve |
| PUT | /api/leaves/{id}/reject |

---

# 🔑 Authentication

After login, include the JWT token in every protected request.

```
Authorization: Bearer YOUR_JWT_TOKEN
```

---

# 🧪 Testing

Run tests using:

```bash
mvn test
```

---

# 📸 Screenshots

Add screenshots here after deployment.

```
docs/
 ├── login.png
 ├── swagger.png
 ├── employees.png
 └── dashboard.png
```

---

# 🚀 Future Improvements

- React Frontend
- Docker Support
- CI/CD Pipeline
- Email Notifications
- File Upload
- Attendance Module
- Payroll Module
- Dashboard Analytics

---

# 👨‍💻 Author

**Abhiraj Santosh Changan**

- Java Full Stack Developer
- Spring Boot Developer
- React Learner

---

# ⭐ Support

If you found this project useful, please consider giving it a ⭐ on GitHub.
