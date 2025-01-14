import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn"

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/" 
        element = {
          <Layout>
            <p>Home Page</p>
          </Layout>
        } 
      />

      <Route
        path="/search"
        element = {
          <Layout>
            <p>Search Page</p>
          </Layout>
        }
      />
      <Route
        path="/register" 
        element = {
          <Layout>
            <Register />
          </Layout>
        } 
      />
      <Route
        path="/signin" 
        element = {
          <Layout>
            <SignIn />
          </Layout>
        } 
      />
    </> 
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}


export default App;