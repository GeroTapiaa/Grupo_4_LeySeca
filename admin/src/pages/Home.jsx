import React from "react";
import { Categories } from "../components/categories/Categories";
import { Metrics } from "../components/metrics/Metrics";
import { LatestProduct } from "../components/products/LatestProducts";

export const Home = () => {
  return (
    <div className="container-fluid">
      <div className="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 className="h3 mb-0 text-title">LEY - SECA</h1>
      </div>

      <Metrics />

      <div className="row">
      <LatestProduct />
        <Categories />
        
      </div>
    </div>
  );
};