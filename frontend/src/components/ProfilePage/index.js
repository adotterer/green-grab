import React, { useEffect, useState } from "react";
import { fetch } from "../../store/csrf";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleOffer } from "../../store/offers";
import "./profilePage.css";

const fetchProfile = async (id) => {
  return await fetch(`/api/profile?userId=${id}`);
};

function ProfilePage() {
  const [profile, setProfile] = useState({});
  const [itemArr, setItemArr] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const { userId } = useParams();

  useEffect(async () => {
    await fetch(`/api/profile?userId=${userId}`).then(({ data }) => {
      console.log("data", data.profile);
      setProfile(data.profile);
      setItemArr(data.profile.Items);
    });
  }, []);

  useEffect(async () => {
    // console.log("itemArr : ", itemArr);
    const urls = itemArr.map((item) => {
      return item.Images[0].URL;
    });
    setImageURLs(urls);
  }, [itemArr]);

  return (
    <div className="div__container">
      {!profile && <h2>Loading....</h2>}
      {profile && itemArr && (
        <div>
          <h2>{profile.username}</h2>
          <div>
            <p>Check out my items: </p>
            {!imageURLs && <p>Loading....</p>}
            {itemArr.map((item) => {
              return (
                <div>
                  <NavLink>
                    {item.itemName}
                    <img
                      className="img__profile__item-pics"
                      src={item.Images[0].URL}
                    />
                  </NavLink>
                </div>
              );
            })}
            {/* {imageURLs &&
              imageURLs.map((url) => {
                return <img className="img__profile__item-pics" src={url} />;
              })} */}
          </div>
        </div>
      )}
    </div>
  );

  // const currentOffer = useSelector((state) => {
  //   return state.offers.offer;
  // });
}

export default ProfilePage;
