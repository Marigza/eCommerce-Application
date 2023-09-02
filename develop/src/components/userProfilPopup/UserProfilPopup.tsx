import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./UserProfilPopup.scss";

export const UserProfilPopup: React.FC = () => {
  return (
    <div className="user-profil-popup">
      <div className="user-profil-popup__wrapper">
        <div className="user-profil-popup__card">
          <div className="user-profil-popup__header">
            <h2 className="user-profil-popup__header_title">User Profil</h2>
            <div className="user-profil-popup__header_logo">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, delectus? Quis
              eligendi tempore vero accusantium, minus quae magnam error sunt deleniti id vel dolor
              neque perferendis, sapiente illo. Architecto, perferendis!
            </div>
          </div>
          <div className="user-profil-popup__content"></div>
          <Link to="/" className="user-profil-popup__button-back">
            <button>Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
