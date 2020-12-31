import React, { useEffect, useState } from "react";
import { fetch } from "../../store/csrf";
import { useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleOffer } from "../../store/offers";

const fetchProfile = async (id) => {
  return await fetch(`/api/profile?userId=${id}`);
};

function ProfilePage() {
  const [profile, setProfile] = useState({});
  const { userId } = useParams();

  useEffect(async () => {
    await fetch(`/api/profile?userId=${userId}`).then(({ data }) => {
      console.log("data", data);
      setProfile(data);
    });
  }, []);

  return (
    <div className="div__container">
      {!profile && <h2>Loading....</h2>}
      {profile && <h2>Done Loading</h2>}
    </div>
  );

  // const currentOffer = useSelector((state) => {
  //   return state.offers.offer;
  // });
}

export default ProfilePage;
