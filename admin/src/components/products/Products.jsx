import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchWithoutToken } from "../../hooks/UseFetch";
import { Product } from "./Product";

export const Products = () => {
    const [products, setProducts] = useState({
        loading: true,
        error: null,
        data: [],
    });

    useEffect(() => {
        fetchWithoutToken("/dashboard").then((response) => {
            if (response.ok) {
                const { data } = response;
                setProducts({
                    ...products,
                    loading: false,
                    data: data,
                });
            } else {
                setProducts({
                    ...products,
                    error: response.error,
                });
            }
        });
    }, []);

    return (
        <div className="cart-product mb-4">
            <div className="container-products">
                <div className="">
                    <h5 className="m-0 font-weight-bold text-gray-800">Productos</h5>
                </div>
                <div className="row-product">
                    <div className="row ">
                    {products.data.map((product, index) => (<Product {...product} key={product.name + index} />))}
                    </div>
                </div>
            </div>
        </div>
    );
};