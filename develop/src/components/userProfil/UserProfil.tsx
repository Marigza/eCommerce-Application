import React from "react";

import "./UserProfil.scss";

const UserProfil: React.FC = () => {
  return (
    <div className="user-profil">
      <div className="user-profil__wrapper">
        <div className="user-profil__card">
          <div className="user-profil__header">
            <h2 className="user-profil__header_title">User Profil</h2>
            <div className="user-profil__header_logo"></div>
          </div>
          <div className="user-profil__content">
            <div className="user-profil__personal-data">
              <div className="user-profil__email-box">
                <p>hancharuk270185@mail.ru</p>
                <button>Change Email</button>
              </div>
              <div className="user-profil__change-password">
                <button>Change Password</button>
              </div>
              <div className="user-profil__data-title-box">
                <h3>User Data</h3>
                <button>Change Data</button>
              </div>
              <div className="user-profil__first-name-box">
                <div>Firs Name</div>
                <p>Mikhail</p>
              </div>
              <div className="user-profil__last-name-box">
                <div>Last Name</div>
                <p>Hancharuk</p>
              </div>
              <div className="user-profil__birthday-box">
                <div>Date of Birth</div>
                <p>27-01-85</p>
              </div>
            </div>
            <div className="user-profil__addres-data">
              <h3>Addresses</h3>
              <div className="user-profil__addres-data_content"></div>
            </div>
          </div>
          <button className="user-profil__button-back">Back</button>
        </div>
      </div>
    </div>
  );
};

export default UserProfil;
