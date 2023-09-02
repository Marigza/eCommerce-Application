import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getUserInfo } from "../../client_Api/userInfo";
import { IAddresses, IUser, IUserInfoState } from "./interfaces";
// import { getproductList } from "../../client_Api/productList";

import "./UserProfil.scss";

class Address {
  constructor(
    public id: string,
    public country: string,
    public city: string,
    public streetName: string,
    public postalCode: string
  ) {}
}

/*
const tablet = "3acd22c7-8640-4b36-a37c-464e6078fc87";
const laptop = "658b5da7-2f5b-479b-a2d8-b3bd8d96ee38";
const phone = "17e4d0e0-174d-4e86-a8fd-ea1f2363193c";

const startPrice = 650;
const endPrice = 850;

const language = `len`;

const getProd = async () => {
  const data = await getproductList(`?filter=variants.text.name:${language}`);
  // const data = await getproductList(`phones`);
  console.log(data);
};
*/

const UserProfil: React.FC = () => {
  const addressGenerate = (body: IAddresses): JSX.Element => {
    return (
      <div className="user-profil__addres-data_info-box">
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
        <div className="user-profil__addres-data_button-box">
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
                <p>{state.email}</p>
                <button>
                  <Link to="/userProfil/UserProfilPopup">Change Email</Link>
                </button>
              </div>
              <div className="user-profil__change-password">
                <button>Change Password</button>
              </div>
              <div className="user-profil__data-title-box">
                <h3>User Data</h3>
                <button onClick={userInfo}>Change Data</button> {/*  здесь вызывается функция ! */}
              </div>
              <div className="user-profil__first-name-box">
                <div>Firs Name</div>
                <p>{state.firstName}</p>
              </div>
              <div className="user-profil__last-name-box">
                <div>Last Name</div>
                <p>{state.lastName}</p>
              </div>
              <div className="user-profil__birthday-box">
                <div>Date of Birth</div>
                <p>{state.dateOfBirth}</p>
              </div>
            </div>
            <div className="user-profil__addres-data">
              <h3>Addresses</h3>
              <div className="user-profil__addres-data_content">{state.addresses}</div>
            </div>
          </div>
          <Link to="/" className="user-profil__button-back">
            <button>Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserProfil;
