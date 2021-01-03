import React, { useEffect, useState } from "react";
import { fetch } from "../../store/csrf";
import { useParams, NavLink } from "react-router-dom";
import GoogleMap from "../GoogleMap";
import "./profilePage.css";

function ProfilePage() {
  const [profile, setProfile] = useState({});
  const [itemArr, setItemArr] = useState([]);
  // const [location, setLocation] = useState();
  const [googleObj, setGoogleObj] = useState();

  const { userId } = useParams();

  useEffect(async () => {
    await fetch(`/api/profile?userId=${userId}`).then(({ data }) => {
      console.log(data.profile.Location);
      setProfile(data.profile);
      setItemArr(data.profile.Items);
      // setLocation(data.profile.Location);
      const obj = {
        address:
          data.profile.Location.city + ", " + data.profile.Location.state,
        lat: data.profile.Location.latitude,
        lng: data.profile.Location.longitude,
      };
      setGoogleObj(obj);
    });
  }, []);

  // useEffect(async () => {
  //   // console.log("itemArr : ", itemArr);
  //   const urls = itemArr.map((item) => {
  //     return item.Images[0].URL;
  //   });
  //   setImageURLs(urls);
  // }, [itemArr]);

  return (
    <div className="div__container">
      {!profile && <h2>Loading....</h2>}
      {profile && itemArr && (
        <div>
          <h2>{profile.username}</h2>
          <h3>{itemArr[0] && <p>{itemArr[0].location}</p>}</h3>
          {!googleObj && "loading..."}
          {googleObj && <GoogleMap googleObj={googleObj} />}
          <hr />
          <div>
            <p>
              <span class="span__num-items">{itemArr.length}</span> items for
              sale:
            </p>
            {!itemArr && <p>Loading....</p>}
            {itemArr &&
              itemArr.map((item) => {
                return (
                  <NavLink exact to={`/items/${userId}/${item.id}`}>
                    <div>
                      {item.itemName}
                      <img
                        className="img__profile__item-pics"
                        src={item.Images[0].URL}
                      />
                      <br />
                    </div>
                  </NavLink>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
