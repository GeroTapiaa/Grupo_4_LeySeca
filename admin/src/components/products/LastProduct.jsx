import React from "react";

export const LastProduct = ({ nameProduct, image, description }) => {

    const img = image ? 'http://localhost:4000/api/products/image/' + image : '../../default-ley-seca.jpg'

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
                    <div className="images-size">
                        <img style={{ width: "6rem" }}src={img} alt={nameProduct} />
                    </div>
                </div>
            </div>
        </div>
    );
};