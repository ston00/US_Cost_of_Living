import React from 'react';
import ReactDOM from 'react-dom/client';
//import App from './App';

// Create a root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app
root.render(<App />);

// root.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );

interface NavigationBar {
    MainTitle: string;
    HomePage: string;
    Comparison: string;
    Expenses: String;
    About: String;
    Contact: String;
    Profile: String;
}

const navgiation: NavigationBar = {
    MainTitle: "...",
    HomePage: "Home",
    Comparison: "Comparison",
    Expenses: "Expenses",
    About: "About",
    Contact: "Contact",
    Profile: "Profile",

};