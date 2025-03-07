# Online Examination Platform (OEP)

A comprehensive online examination platform that facilitates exam management, user registration with approval workflow, and result management.

## Features

- Multi-tier Role-based Access Control (Admin, Principal, HOD, Teacher, Student)
- Hierarchical User Registration Approval System
- Exam Creation and Management
- Real-time Result Viewing
- Automated Notification System
- Profile Management

## Tech Stack

### Frontend
- React.js (JSX)
- Axios for API integration
- Tailwind CSS for styling
- React Router for navigation
- Redux for state management

### Backend
- Java
- Spring Boot
- Spring Security
- Hibernate ORM
- PostgreSQL Database

## Project Structure

```
OEP-MyIdea/
├── backend/         # Spring Boot application
└── frontend/        # React application
```

## Prerequisites

- Node.js (v14 or higher)
- Java JDK 17 or higher
- PostgreSQL 13 or higher
- Maven

## Setup Instructions

### Backend Setup
1. Navigate to the backend directory
2. Configure PostgreSQL database settings in `application.properties`
3. Run `mvn clean install`
4. Start the application using `mvn spring-boot:run`

### Frontend Setup
1. Navigate to the frontend directory
2. Run `npm install`
3. Run `npm start`

## User Roles and Workflow

1. **Admin**
   - Has complete system access
   - Can manage all users and roles

2. **Principal**
   - Registration needs admin approval
   - Can approve HOD registrations

3. **HOD (Head of Department)**
   - Registration needs principal approval
   - Can approve teacher registrations

4. **Teacher**
   - Registration needs HOD approval
   - Can create and manage exams
   - Can evaluate exam submissions

5. **Student**
   - Registration needs teacher approval
   - Can take exams and view results

## License

MIT License 