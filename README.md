# Dynamic View Navigation System

This project is a dynamic view navigation system built with Vue.js and Motoko, managed by DFX. It allows for the dynamic rendering of components based on user interactions and navigation paths.

You can add any number of components and arrange them with CSS, add HTML as a notification, inject JavaScript code, or add an entire view to each node. The views are stored in a tree structure, but you can navigate as if it were a network of proxy views.

## Table of Contents

- Installation
- Usage
- Project Structure
- Components
- Contributing
- License

## Installation

To get started with this project, follow these steps:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

2. **Install DFX:**

    Follow the instructions to install DFX from the DFINITY SDK documentation.

3. **Install dependencies:**

    ```bash
    npm install
    ```

4. **Start the DFX local network:**

    ```bash
    dfx start --background
    ```

5. **Deploy the canisters:**

    ```bash
    dfx deploy
    ```

6. **Run the development server:**

    ```bash
    npm start
    ```

7. **Open your browser:**

    Navigate to `http://localhost:3000` to see the application in action.

## Usage

This project demonstrates a dynamic view navigation system. The main component is `ViewNavigator.vue`, which handles the navigation and dynamic rendering of views.

### Adding Views

You can add new views by using the `addView` function in `useViewTree.js`. Each view can have its own components, props, and navigation logic.

Example:

```javascript
addView(1, 'View 1', 'ViewComponent1', [], { backgroundColor: '#ffcccc' }, (params) => {
  console.log('Script for View 1', params);
}, '<div><h3>Custom HTML for View 1</h3><p>This is some custom content for View 1.</p></div>', 'View 3', {}, [
  { name: 'NextButton', props: {} },
  { name: 'MessageComponent', props: { message: 'Hello from View 1!' } }
]);
