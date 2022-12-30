import React from "react";

export const User = ({ surname, user, email, firstName, avatar }) => {
    
    const img = avatar ? 'http://localhost:4000/api/users/avatar/' + avatar : '../default-ley-seca.jpg'

    return (
        <div className="col-lg-6 mb-4">
            <div className="card bg-dark text-white shadow">
                <div className="card-body">
                    <div>
                        <p>{user}</p>
                    </div>
                    <div>
                    <p>{firstName} {surname}</p>
                    </div>
                    <div>
                        <p>{email}</p>
                    </div>
                    <div className="avatar-size">
                        <img   style={{ width: "6rem" }}src={img} />
                    </div>
                </div>
            </div>
        </div>
    );
};