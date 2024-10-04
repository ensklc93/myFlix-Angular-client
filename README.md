# MyVideo Angular Client
MyVideo Angular Client is a dynamic web application developed using Angular, TypeScript, and Angular Material. It serves as the frontend interface for an existing RESTful API, allowing users to seamlessly browse, view, and manage a curated collection of movies. The application emphasizes user experience with features such as user registration, authentication, profile management, and the ability to mark movies as favorites. With a responsive design and robust error handling, MyVideo ensures an engaging and reliable experience across various devices.

## Table of Contents
- [Installation Instructions](#installation-instructions)
  - [Prerequisites](#prerequisites)
  - [Setup Steps](#setup-steps)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [License](#license)
- [Contact](#contact)


## Installation Instructions

### Prerequisites
Before setting up the project, ensure you have the following installed on your machine:

- **Node.js** (v14 or higher): [Download Node.js](https://nodejs.org/)
- **npm** (v6 or higher): Comes bundled with Node.js. Verify installation by running `npm -v` in your terminal.
- **Angular CLI**: Install globally using npm.

  ```bash
  npm install -g @angular/cli
  ```
### Setup Steps
Follow these steps to get the project up and running locally:

1. **Clone the Repository**

    Open your terminal and execute:
    ```bash
    git clone https://github.com/ensklc93/myVideo-Angular-client.git
    cd myVideo-Angular-client
    ```

2. **Install Dependencies**

    Install all necessary packages by running:
    ```bash
    npm install
    ```

3. **Configure Environment Variables**

    Ensure that the API base URL is correctly set. Open `fetch-api-data.service.ts` located in `src/app/services/` and verify the `apiUrl`:
    ```bash
    const apiUrl = 'https://my-movie-app-ab91e4bb4611.herokuapp.com/'
    ```

4. **Run the Application**

    Start the development server with:
    ```bash
    ng serve
    ```

    Navigate to `http://localhost:4200/` in your web browser to view the application.

## Usage

Once the application is running, follow these steps to utilize its features:

1. **Welcome Page**
    - **Register:** Click on the "Sign Up" button to create a new account by providing a username, password, email, and birthday.
    - **Login:** Click on the "Log In" button to access your account using your credentials.

2. **User Authentication**
    - **Registration:** Upon successful registration, you'll receive a confirmation, and your account details will be stored securely.
    - **Login:** Enter your username and password to log in. Upon successful authentication, you'll be redirected to the Movies page.

3. **Browsing Movies**
    - **View Movies:** Explore the list of available movies fetched from the API.
    - **Movie Details:** Click on a movie card to view detailed information, including description, director, and genre.

4. **Managing Favorites**
    - **Add to Favorites:** Click the heart icon on a movie card to add it to your favorites list. The icon will change to indicate its favorite status.
    - **Remove from Favorites:** Click the heart icon again to remove the movie from your favorites.

5. **Profile Management**
    - **View Profile:** Access your profile to view and manage your personal information and favorite movies.
    - **Edit Profile:** Update your email, password, or birthday as needed.
    - **Delete Account:** Permanently remove your account from the application.

6. **Logout**
        Click the logout button to securely end your session.

## Technologies Used
The project leverages a combination of modern technologies and tools to deliver a robust and scalable application:

- **Frontend Framework:** [Angular](https://angular.io/) (v18.2.0)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (v5.5.2)
- **UI Components:** [Angular Material](https://material.angular.io/) (v18.2.5)
- **Reactive Programming:** [RxJS](https://rxjs.dev/) (~7.8.0)
- **HTTP Requests:** Angular's HttpClient
- **State Management & Routing:** Angular Router
- **Styling:** [SCSS](https://sass-lang.com/)
- **Tooling:**
  - [Angular CLI](https://cli.angular.io/) (v18.2.5)
  - [TypeDoc](https://typedoc.org/) for generating documentation
  - [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for maintaining code quality
- **Testing:** Jasmine and Karma
- **Version Control:** [Git](https://git-scm.com/)
- **Hosting:** [GitHub Pages](https://pages.github.com/)
- **Package Manager:** [npm](https://www.npmjs.com/)

## Features
MyVideo Angular Client offers a comprehensive set of features designed to enhance user interaction and experience:

- **User Authentication**
  - **Registration:** Create a new account with username, password, email, and birthday.
  - **Login:** Securely log in using registered credentials.
  - **Logout:** Safely end user sessions.

- **Profile Management**
  - **View Profile:** Display user information and favorite movies.
  - **Edit Profile:** Update email, password, and birthday.
  - **Delete Account:** Remove user accounts permanently.

- **Movie Browsing**
  - **View All Movies:** Display a list of all available movies.
  - **Movie Details:** Access detailed information about each movie, including description, director, and genre.
  - **Responsive Design:** Ensure optimal viewing on various devices using Angular Material.

- **Favorites Management**
  - **Add to Favorites:** Mark movies as favorites for easy access.
  - **Remove from Favorites:** Unmark movies from the favorites list.
  - **Favorites Display:** View a curated list of favorite movies in the profile section.

- **Error Handling & Notifications**
  - **Snack Bars:** Provide real-time feedback for actions like successful registrations, logins, and error notifications.
  - **Form Validation:** Ensure user inputs are valid before processing.

- **Code Quality & Documentation**
  - **TypeScript:** Leverage strong typing for enhanced code reliability.
  - **ESLint & Prettier:** Maintain consistent code style and quality.
  - **TypeDoc:** Generate comprehensive documentation for the codebase.

- **Deployment**
  - **GitHub Pages:** Host the application seamlessly for public access.

## License
This project is licensed under the [MIT License](./LICENSE). You are free to use, modify, and distribute this software as per the terms of the license.
