import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../client_Api/userInfo";
import { IAddresses, IUser, IUserInfoState, IUserPopupState } from "./interfaces";
import { UserProfilePopupEmail } from "../userProfilePopup/UserProfilePopupEmail";
import { UserProfilePopupPassword } from "../userProfilePopup/UserProfilePopupPassword";

import "./UserProfile.scss";

class Address {
  constructor(
    public id: string,
    public country: string,
    public city: string,
    public streetName: string,
    public postalCode: string
  ) {}
}

const UserProfile: React.FC = () => {
  const addressGenerate = (body: IAddresses): JSX.Element => {
    return (
      <div className="user-profile__addres-data_info-box">
        <h4>{body.id}</h4>
        <p>
          <span>Country</span>
          {body.country}
        </p>
        <p>
          <span>City</span>
          {body.city}
        </p>
        <p>
          <span>Street</span>
          {body.streetName}
        </p>
        <p>
          <span>Postal code</span>
          {body.postalCode}
        </p>
        <div className="user-profile__addres-data_button-box">
          <button>Change</button>
          <button>remove</button>
        </div>
      </div>
    );
  };

  const [state, setState] = useState<IUserInfoState>({
    email: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    addresses: [],
  });

  const [isUserPopup, setUserPopup] = useState<IUserPopupState>({
    emailPopupActive: false,
    passwordPopupActive: false,
  });

  const userInfo = async (): Promise<void> => {
    const user: IUser | null = await getUserInfo();

    if (!user) return;

    const addresCollection: IAddresses[] = user.addresses.map((el: IAddresses) => {
      const id: string = user.billingAddressIds.includes(el.id)
        ? "Billing"
        : user.shippingAddressIds.includes(el.id)
        ? "Shipping"
        : "";
      const addres: IAddresses = new Address(id, el.country, el.city, el.streetName, el.postalCode);
      return addres;
    });

    const addresElement: JSX.Element[] = addresCollection.map((el: IAddresses) =>
      addressGenerate(el)
    );

    setState({
      ...state,
      email: `${user.email}`,
      firstName: `${user.firstName}`,
      lastName: `${user.lastName}`,
      dateOfBirth: `${user.dateOfBirth}`,
      addresses: addresElement,
    });
  };

  const userPopupActive = (arg: string): void => {
    setUserPopup({
      ...isUserPopup,
      emailPopupActive: arg === "email",
      passwordPopupActive: arg === "password",
    });
  };

  useEffect(() => {
    userInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="user-profile">
      <div className="user-profile__wrapper">
        <div className="user-profile__card">
          <div className="user-profile__header">
            <h2 className="user-profile__header_title">User Profile</h2>
            <div className="user-profile__header_logo"></div>
          </div>
          <div className="user-profile__content">
            <div className="user-profile__personal-data">
              <div className="user-profile__email-box">
                <UserProfilePopupEmail
                  email={state.email}
                  isEmailActive={isUserPopup.emailPopupActive}
                />
                <p>{state.email}</p>
                <button onClick={() => userPopupActive("email")}>Change Email</button>
              </div>
              <div className="user-profile__change-password">
                <UserProfilePopupPassword
                  email={state.email}
                  isPasswordActive={isUserPopup.passwordPopupActive}
                />
                <button onClick={() => userPopupActive("password")}>Change Password </button>
              </div>
              <div className="user-profile__data-title-box">
                <h3>User Data</h3>
                <button onClick={userInfo}>Change Data</button> {/*  здесь вызывается функция ! */}
              </div>
              <div className="user-profile__first-name-box">
                <div>Firs Name</div>
                <p>{state.firstName}</p>
              </div>
              <div className="user-profile__last-name-box">
                <div>Last Name</div>
                <p>{state.lastName}</p>
              </div>
              <div className="user-profile__birthday-box">
                <div>Date of Birth</div>
                <p>{state.dateOfBirth}</p>
              </div>
            </div>
            <div className="user-profile__addres-data">
              <h3>Addresses</h3>
              <div className="user-profile__addres-data_content">{state.addresses}</div>
            </div>
          </div>
          <Link to="../" className="user-profile__button-back">
            <button>Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
