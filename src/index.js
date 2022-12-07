import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Registers from "./routes/Register";
import Logins from "./routes/Login";
import "./dist/styles/app.scss";
import Homes from "./routes/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <Homes />,

    children: [
      {
        index: true,
        element: (
          <div>
            <h1>Hello World</h1>
            <Link to="register">register</Link>
          </div>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <Registers />,
  },
  {
    path: "/login",
    element: <Logins />,
  },
]);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
