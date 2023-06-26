import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Perks from "./Perks";
import axios from "axios";

const PlacesPage = () => {
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [CheckOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);

  function inputHeader(text) {
    return <h2 className="text-xxl mt-4">{text}</h2>;
  }
  function inputDescription(text) {
    return <p className="test-gray-500 text-sm">{text}</p>;
  }

  function preInput(header, description) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(description)}
      </>
    );
  }
  const { action } = useParams();
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-4 rounded-full "
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add New Place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form action="">
            {preInput(
              "Title",
              " title for you place, should be short and catchy as in advertisement"
            )}

            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              placeholder="title, for example: My lovely Appartment"
            />
            {preInput("Address", "Address for your place")}
            <input
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            {preInput("Photos", "More = better")}
            <div className="flex gap-2">
              <input
                type="text"
                value={photoLink}
                onChange={(e) => {
                  setPhotoLink(e.target.value);
                }}
                placeholder={"Add using a link ....jpg"}
              />
              <button
                className="bg-gray-200 px-4 rounded-2xl"
                onClick={async (event) => {
                  event.preventDefault();
                  try {
                    const { data } = await axios.post("upload-by-link", {
                      link: photoLink,
                    });
                    setPhotos((prev) => {
                      return [...prev, data];
                    });
                    setPhotoLink("");
                    console.log(photos);
                  } catch (e) {
                    console.log(
                      "error at axios at page (PlacesPage.jsx): " + e
                    );
                  }
                }}
              >
                Add&nbsp;photo
              </button>
            </div>
            <div className="grid gap-2 grid-cols-3 lg:grid-col-6 md:gird-col-4 mt-2">
              {photos.length > 0 &&
                photos.map((items, key) => {
                  return (
                    <img
                      className="rounded-2xl"
                      key={key}
                      src={"http://localhost:3000/uploads/" + items}
                      alt=""
                    />
                  );
                })}
              <label
                htmlFor="upload"
                className="cursor-pointer flex items-center justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600"
              >
                <input
                  type="file"
                  id="upload"
                  multiple
                  className="hidden"
                  onChange={async (event) => {
                    const files = event.target.files;
                    console.log("The file is ", files);
                    const data = new FormData();
                    console.log("The form data fetched from file is:", data);
                    for (let i = 0; i < files.length; i++) {
                      data.append("photos", files[i]);
                    }
                    axios
                      .post("/upload", data, {
                        headers: { "Content-type": "multipart/form-data" },
                      })
                      .then((response) => {
                        const { data } = response;
                        console.log("The filedata is", data);
                        setPhotos((prev) => {
                          return [...prev, data];
                        });
                      });
                  }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-8 h-8"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
                Upload
              </label>
            </div>
            {preInput("Description", "Description of the place")}
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            ></textarea>
            {preInput("Perks", "Select all the perks of your place")}
            <div className="mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <Perks selected={perks} onChange={setPerks} />
            </div>
            {preInput("Extra Info", "House rules, etc")}
            <textarea
              value={extraInfo}
              onChange={(e) => {
                setExtraInfo(e.target.value);
              }}
            />
            {preInput(
              "Check in and check out times",
              "add check in and check out time"
            )}
            <div className="grid gap-2 sm:grid-cols-3">
              <div className="mt-2 -mb-1">
                <h3>Check in time</h3>
                <input
                  type="text"
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                  }}
                  placeholder="14:00"
                />
              </div>
              <div className="mt-2 -mb-1">
                <h3>Check out time</h3>
                <input
                  type="text"
                  placeholder="8:00"
                  value={CheckOut}
                  onChange={(e) => {
                    setCheckOut(e.target.value);
                  }}
                />
              </div>
              <div className="mt-2 -mb-1">
                <h3>Max number of guests</h3>
                <input
                  type="number"
                  value={maxGuests}
                  onChange={(e) => {
                    setMaxGuests(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="my-4">
              <button className="primary">Save</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PlacesPage;
