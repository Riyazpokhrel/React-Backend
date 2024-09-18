import { Outlet, Route, Routes } from "react-router-dom";
import Navbar from "./Product/Navbar";
import CreateProduct from "./Product/CreateProduct";
import ReadAllProduct from "./Product/ReadAllProduct";
import ProductSpecificDetails from "./Product/ProductSpecificDetails";
import UpdateProduct from "./Product/EditProduct";

const Project = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Navbar />
              <Outlet></Outlet>
            </div>
          }
        >
          <Route index element={<div>Home</div>}></Route>
          <Route
            path="products"
            element={
              <div>
                <Outlet></Outlet>
              </div>
            }
          >
            <Route index element={<ReadAllProduct />}></Route>
            <Route path=":id" element={<ProductSpecificDetails />}></Route>
            <Route
              path="create"
              element={
                <div>
                  <CreateProduct />
                </div>
              }
            ></Route>
            <Route
              path=":id"
              element={<div>Update specific product</div>}
            ></Route>
            <Route
              path="update"
              element={
                <div>
                  <Outlet></Outlet>
                </div>
              }
            >
              <Route index element={<UpdateProduct />}></Route>
            </Route>
          </Route>
        </Route>
      </Routes>
    </div>
  );
};

export default Project;
