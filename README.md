# task-manager-frontend

Angular 17 frontend for task management, consuming APIs in Cloud Functions

## Project Description

This project is the frontend of a technical challenge that consists of building a task management (To-Do List) application using Angular 17. The main goal is to demonstrate good frontend architecture, clean code practices, component-based design, and proper separation of concerns.

The application allows users to log in using their email address and manage their personal tasks. Users can create, edit, delete, and mark tasks as completed or pending. All tasks are displayed in chronological order based on their creation date.

## Features

- Email-based login system.
- Email-based user validation. If the user does not exist, a confirmation dialog is shown before creating the account.
- Task creation with title and description.
- Task editing and deletion.
- Ability to mark tasks as completed or pending using a checkbox.
- Tasks sorted by creation date.
- Responsive design for desktop, tablet, and mobile devices.
- Protected routes using route guards.
- Clean and modular component-based architecture.
- Integration with a RESTful backend API hosted on Firebase Cloud Functions.
- Form validation and error handling.

## Technologies Used

- Angular 17
- TypeScript
- SCSS – CSS
- RxJS
- Angular Router
- Angular Forms (Reactive Forms)
- Firebase Cloud Functions
- Firebase Hosting (planned)
- Git & GitHub

## Project Architecture

This project follows a modular and scalable architecture based on Angular best practices and separation of concerns. The main goal is to keep the codebase clean, maintainable, and easy to extend.

Core responsibilities such as HTTP communication, route protection, and global services are centralized to avoid duplication and follow the DRY principle.

The architecture also follows principles inspired by Clean Architecture, focusing on:

- Separation of concerns
- Single Responsibility Principle (SRP)
- Dependency inversion
- Loose coupling between layers

## Folder Structure

This section will be completed once the final project structure is defined.  
The project will follow a feature-based architecture to ensure scalability, maintainability, and clear separation of concerns.

## Application Flow

This section will be completed once the full user flow is implemented.

## Backend Integration

The frontend communicates with a RESTful backend API hosted on Firebase Cloud Functions. This integration is responsible for handling all business logic related to users and tasks.

The frontend interacts with the backend through HTTP services using Angular’s HttpClient, following a clean and decoupled service-based approach.

Main responsibilities handled by the backend:

- User validation by email.
- User creation after confirmation.
- Task retrieval.
- Task creation.
- Task updates.
- Task deletion.

All API communication is centralized in dedicated services to ensure:

- Reusability
- Testability
- Separation of concerns
- Easier maintenance

## State and Data Management

The application uses a service-based state management approach, leveraging Angular services and RxJS observables to handle shared data and application state.

Key concepts used:

- RxJS Observables and Subjects to manage asynchronous data streams.
- BehaviorSubjects for maintaining and sharing the current state across components.
- Async Pipe in templates to automatically subscribe and unsubscribe from observables.
- Immutable data patterns to avoid unexpected side effects.

This approach allows:

- A predictable data flow.
- Better separation between UI and business logic.
- Easier debugging and testing.
- Reduced coupling between components.

## Security

Basic security measures are implemented to ensure safe communication between the frontend and the backend.

The application includes:

- Route protection using Angular Guards to restrict access to authenticated users.
- Centralized HTTP request handling through HTTP Interceptors.
- Input validation on all forms to prevent invalid or malformed data.
- Proper error handling for API responses.
- Environment-based configuration to avoid exposing sensitive values.

## Styling and UI

The user interface is designed with a focus on clarity, simplicity, and usability. The main goal is to provide a clean and intuitive experience while keeping the design consistent across all devices.

Key UI principles applied:

- Responsive design to ensure proper behavior on desktop, tablet, and mobile devices.
- Reusable UI components to maintain consistency.
- SCSS architecture for modular and maintainable styling.
- Semantic HTML and accessible elements.
- Clear visual feedback for user actions.

## Installation and Setup

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/andres0996/task-manager-frontend.git
cd task-manager-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
ng serve
```

### 4. Open in your browser

Open the application at [http://localhost:4200](http://localhost:4200)


## Testing

This section will be completed in future iterations.

## Production Build

This section will be completed in future iterations.

The production build will be generated using Angular CLI with optimization, minification, and tree-shaking enabled to ensure optimal performance.

## Deployment

This section will be completed in future iterations.  
The application will be deployed to Firebase Hosting.

## Technical Decisions

This project follows several technical and architectural decisions to ensure maintainability, scalability, and clean code:

- Feature-based architecture: Each feature (auth, tasks) is modularized to keep code organized and independent.
- Component-based design: UI elements are reusable and isolated.
- Service layer for API communication: All HTTP requests are centralized in services for decoupling and testability.
- RxJS and Observables: Used for asynchronous data handling and reactive patterns.
- Separation of concerns: UI, business logic, and data handling are separated to follow Clean Architecture principles.
- Placeholder sections: Some parts like testing, production build, and deployment are planned for future iterations.
- Responsiveness and accessibility: Design decisions ensure the app works on multiple devices and follows basic accessibility standards.

## Future Improvements

This section will be completed in future iterations.

Planned improvements will include additional features, enhanced testing, and optimizations for scalability, performance, and user experience.

## Author

**Andres Alvarez**  
- GitHub: [https://github.com/andres0996](https://github.com/andres0996)
- Email: andresalvareztt@gmail.com
