import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useContext } from "react";

const Account = () => {
  const { user } = useContext(UserContext);

  //   if (!ready) {
  //     return "Loading...";
  //   }
  let { subpage } = useParams();
  if (subpage === undefined) {
    subpage = "profile";
  }
  if (!user) {
    return <Navigate to={"/login"} />;
  }

  function linkClasses(type = null) {
    let classes = "py-2 px-6 ";
    if (type === subpage) {
      classes += "bg-primary text-white rounded-full";
    }
    return classes;
  }

  return (
    <div>
      <nav className="w-full flex justify-center mt-8 gap-2 mb-8 ">
        <Link className={linkClasses("profile")} to={"/account/"}>
          My profile
        </Link>
        <Link className={linkClasses("bookings")} to={"/account/bookings"}>
          My bookings
        </Link>
        <Link className={linkClasses("places")} to={"/account/places"}>
          My accomodations
        </Link>
      </nav>
      {subpage === "profile" && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.name} <br />
          <button className="primary max-w-sm mt-2">button</button>
        </div>
      )}
    </div>
  );
};

export default Account;
