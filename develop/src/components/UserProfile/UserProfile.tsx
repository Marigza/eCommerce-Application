import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getUserInfo, removeAddressOfUser } from "../../client_Api/userInfo";
import { IAddresses, IUser, IUserInfoState } from "./interfaces";
import { UserProfilePopupEmail } from "../userProfilePopup/UserProfilePopupEmail";
import { UserProfilePopupPassword } from "../userProfilePopup/UserProfilePopupPassword";
import { UserProfilePopupData } from "../userProfilePopup/UserProfilePopupData";
import { UserProfilePopupAddress } from "../userProfilePopup/UserProfilePopupAddress";

import "./UserProfile.scss";

class Address {
  constructor(
    public id: string,
    public type: string,
    public country: string,
    public city: string,
    public streetName: string,
    public postalCode: string
  ) {}
}

const UserProfile: React.FC = () => {
  const [addresState, setAddresState] = useState<IAddresses>({
    id: "",
    type: "",
    country: "",
    city: "",
    streetName: "",
    postalCode: "",
  });

  const [isAddresPopupActive, setIsAddresPopupActive] = useState(false);

  const openAddresPopup = () => {
    setIsAddresPopupActive(true);
  };
  const closeAddresPopup = () => {
    setIsAddresPopupActive(false);
  };

  const handlerChangeAddres = (body: IAddresses) => {
    setAddresState({
      ...addresState,
      id: body.id,
      type: body.type,
      country: body.country,
      city: body.city,
      streetName: body.streetName,
      postalCode: body.postalCode,
    });
    openAddresPopup();
  };

  const [count, setCount] = useState(0);

  const handlerRemoveAddres = (id: string) => {
    removeAddressOfUser(id).then(() => setCount(count + 1));
  };

  const addressGenerate = (body: IAddresses): JSX.Element => {
    return (
      <div className="user-profile__addres-data_info-box">
        <h4>{body.type}</h4>
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
          <button
            onClick={() =>
              handlerChangeAddres({
                id: body.id,
                type: body.type,
                country: body.country,
                city: body.city,
                streetName: body.streetName,
                postalCode: body.postalCode,
              })
            }
          >
            Change
          </button>
          <button onClick={() => handlerRemoveAddres(body.id)}>remove</button>
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

  const [isPasswordPopupActive, setIsPasswordPopupActive] = useState(false);

  const [isEmailPopupActive, setIsEmailPopupActive] = useState(false);

  const [isDataPopupActive, setIsDataPopupActive] = useState(false);

  const openPasswordPopup = () => {
    setIsPasswordPopupActive(true);
  };
  const openEmailPopup = () => {
    setIsEmailPopupActive(true);
  };
  const openDataPopup = () => {
    setIsDataPopupActive(true);
  };

  const closePasswordPopup = () => {
    setIsPasswordPopupActive(false);
  };
  const closeEmailPopup = () => {
    setIsEmailPopupActive(false);
  };
  const closeDataPopup = () => {
    setIsDataPopupActive(false);
  };

  const userInfo = async (): Promise<void> => {
    const user: IUser | null = await getUserInfo();

    if (!user) return;

    const addresCollection: IAddresses[] = user.addresses.map((el: IAddresses) => {
      const type: string = user.billingAddressIds.includes(el.id)
        ? "Billing"
        : user.shippingAddressIds.includes(el.id)
        ? "Shipping"
        : "";
      const addres: IAddresses = new Address(
        el.id,
        type,
        el.country,
        el.city,
        el.streetName,
        el.postalCode
      );
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

  useEffect(() => {
    userInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAddresPopupActive, isPasswordPopupActive, isEmailPopupActive, isDataPopupActive, count]);

  return (
    <div className="user-profile">
      <div className="user-profile__wrapper">
        <div className="user-profile__card">
          <div className="user-profile__header">
            <h2 className="user-profile__header_title">User Profile</h2>
            <div className="user-profile__header_logo"></div>
          </div>
          <div className="user-profile__content">
            <UserProfilePopupEmail
              email={state.email}
              isEmailActive={isEmailPopupActive}
              onClose={closeEmailPopup}
            />
            <UserProfilePopupPassword
              email={state.email}
              isPasswordActive={isPasswordPopupActive}
              onClose={closePasswordPopup}
            />
            <UserProfilePopupData
              email={state.email}
              firstName={state.firstName}
              lastName={state.lastName}
              dateOfBirth={state.dateOfBirth}
              isDataActive={isDataPopupActive}
              onClose={closeDataPopup}
            />
            <UserProfilePopupAddress
              id={addresState.id}
              type={addresState.type}
              country={addresState.country}
              streetName={addresState.streetName}
              postalCode={addresState.postalCode}
              city={addresState.city}
              isAddressActive={isAddresPopupActive}
              onClose={closeAddresPopup}
            />
            <div className="user-profile__personal-data">
              <div className="user-profile__email-box">
                <p>{state.email}</p>
                <button onClick={openEmailPopup}>Change Email</button>
              </div>
              <div className="user-profile__change-password">
                <button onClick={openPasswordPopup}>Change Password </button>
              </div>
              <div className="user-profile__data-title-box">
                <h3>User Data</h3>
                <button onClick={openDataPopup}>Change Data</button>
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
              <div className="user-profile__addres-data_title">
                <h3>Addresses</h3>
                <button
                  onClick={() =>
                    handlerChangeAddres({
                      id: "",
                      type: "",
                      country: "",
                      city: "",
                      streetName: "",
                      postalCode: "",
                    })
                  }
                >
                  Add address
                </button>
              </div>
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
