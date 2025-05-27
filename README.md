# Product Requirements Document (PRD)

## Product Name

**FlowBoard** – Kanban Web Application

---

## 1. Purpose

FlowBoard is a lightweight Kanban-style project and task management tool for individuals and small teams. The goal is to help users visualize work, manage tasks efficiently, and collaborate in real-time.

---

## 2. Scope

- Users can create boards, lists (columns), and cards (tasks)
- Supports drag-and-drop interaction
- Provides real-time collaboration
- Includes authentication, user roles, and team collaboration
- Mobile responsive

---

## 3. Features

### 3.1 User Management

- Sign up / Sign in (email + password, or third-party OAuth: Google)
- User profile (name, email, avatar)
- Forgot password / password reset
- Email verification (optional)

### 3.2 Boards

- Create/edit/delete boards
- Star/favorite boards
- Invite collaborators to boards
- Set board visibility: private / team / public

### 3.3 Lists (Columns)

- Add/edit/delete lists (e.g., "To Do", "In Progress", "Done")
- Reorder lists via drag-and-drop

### 3.4 Cards (Tasks)

- Create/edit/delete cards
- Assign members
- Add descriptions, due dates, tags
- Checklist support
- File attachments
- Move cards across lists (drag-and-drop)
- Commenting and activity log

### 3.5 Notifications

- In-app notifications for mentions, due dates, board invites
- Real-time updates via websockets or similar tech

### 3.6 Team & Collaboration

- Create/join teams
- Add/remove team members
- Team dashboard showing boards and members

### 3.7 Search & Filter

- Filter by assignee, due date, tags
- Full-text search across cards and boards

### 3.8 Settings

- Dark mode
- Account settings
- Board-specific settings (e.g., background, permissions)

---

## 4. Non-Functional Requirements

### 4.1 Performance

- Load time < 2s
- Drag-and-drop should feel fluid (< 50ms response)

### 4.2 Security

- Authentication with JWT/session-based auth
- Role-based access (admin, member, guest)
- Data encryption at rest and in transit (HTTPS)

### 4.3 Scalability

- Must support up to 10,000 users per board without performance degradation

### 4.4 Tech Stack (Proposed)

- **Frontend:** Next.js, React, TailwindCSS, Zustand or Redux
- **Backend:** Node.js with Express or Next.js API routes
- **Database:** Supabase / PostgreSQL
- **Real-time:** Supabase Realtime / Ably / Pusher
- **Authentication:** Supabase Auth or Auth0

---

## 5. User Stories

### As a user...

- I want to create tasks so I can manage my project work.
- I want to drag tasks between columns so I can update progress.
- I want to assign tasks to team members to delegate work.
- I want to be notified when I'm mentioned or assigned.
- I want to collaborate with teammates in real-time.
