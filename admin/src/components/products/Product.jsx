import React from "react";

export const Product = ({ nameProduct, price, image,description }) => {

    const img = image ? 'http://localhost:4000/api/products/image/' + image : '../default-ley-seca.jpg'

    return (
        <div className="col-lg-6 mb-4">
            <div className="card bg-dark text-white shadow">
                <div className="card-body">
                    <div>
                        {nameProduct}
                    </div>
                    <div>
                        {description}
                    </div>
                    <div><img   style={{ width: "6rem" }}src={img} /></div>
                    <div>
                        <p>{`$`} {price}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};