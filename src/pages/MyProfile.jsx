import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Import AuthContext to get the logged-in user
import Cookies from "js-cookie";

// Generate avatar color based on username
const generateAvatarColor = (username) => {
  const colors = ["#FF5733", "#33FF57", "#3357FF", "#F5FF33", "#FF33F6"]; // Consistent colors
  const index = username.charCodeAt(0) % colors.length; // Simple hash to choose color
  return colors[index];
};

const getInitials = (name) => {
  return name
    .split(" ")
    .map((n) => n[0].toUpperCase())
    .join("");
};

const MyProfile = () => {
  const { username, email } = useAuth(); // Get username and email from AuthContext

  // Initialize userData from cookies or default values
  const [userData, setUserData] = useState(() => {
    const savedData = Cookies.get("userData");
    return savedData
      ? JSON.parse(savedData)
      : {
          name: username || "",
          image: "",
          email: email || "",
          phone: "+1 123 456 7890",
          address: {
            line1: "",
            line2: "",
          },
          gender: "",
          dob: "",
          bloodGroup: "",
        };
  });

  const [isEdit, setIsEdit] = useState(false);
  const avatarInputRef = useRef(null); // Reference for the avatar input

  // Update userData when username or email changes
  useEffect(() => {
    setUserData((prev) => ({
      ...prev,
      name: username,
      email: email,
    }));
  }, [username, email]);

  // Function to handle avatar upload
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = reader.result;
        setUserData((prev) => ({ ...prev, image: newImage }));
        // Save the new image to cookies
        Cookies.set(
          "userData",
          JSON.stringify({ ...userData, image: newImage }),
          { expires: 7 }
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save updated user data to cookies
    Cookies.set("userData", JSON.stringify(userData), { expires: 7 }); // Set expiration if needed
    setIsEdit(false);
  };

  // Generate avatar based on username initials if no image is uploaded
  const avatarStyle = {
    backgroundColor: generateAvatarColor(userData.name), // Use the provided function
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "144px", // Equal to w-36
    height: "144px", // Equal to h-36
    borderRadius: "50%",
    fontSize: "36px",
    color: "white",
  };

  return (
    <div className="max-w-lg flex flex-col gap-2 text-sm">
      {/* Avatar */}
      <div className="relative w-36 h-36">
        {userData.image ? (
          <img
            className="w-full h-full rounded-full object-cover"
            src={userData.image}
            alt="user-avatar"
          />
        ) : (
          <div style={avatarStyle}>{getInitials(userData.name)}</div>
        )}
        {isEdit && (
          <>
            <button
              className="absolute bottom-2 right-2 bg-primary text-white px-2 py-1 rounded-full"
              onClick={() => avatarInputRef.current.click()}
            >
              Change
            </button>
            <input
              type="file"
              ref={avatarInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleAvatarChange}
            />
          </>
        )}
      </div>

      {/* Username */}
      {isEdit ? (
        <input
          className="bg-gray-50 text-3xl font-medium max-w-60 mt-4"
          type="text"
          value={userData.name}
          onChange={(e) =>
            setUserData((prev) => ({ ...prev, name: e.target.value }))
          }
        />
      ) : (
        <p className="font-medium text-3xl text-neutral-800 mt-4">
          {userData.name}
        </p>
      )}

      <hr className="bg-zinc-400 h-[1px] border-none" />

      <div>
        <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Phone:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-52"
              type="text"
              value={userData.phone}
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, phone: e.target.value }))
              }
            />
          ) : (
            <p className="text-blue-400">{userData.phone}</p>
          )}
        </div>
      </div>

      <div>
        <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
        <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
          <p className="font-medium">Gender:</p>
          {isEdit ? (
            <select
              className="max-w-20 bg-gray-100"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, gender: e.target.value }))
              }
              value={userData.gender}
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          ) : (
            <p className="text-gray-400">
              {userData.gender || "Not specified"}
            </p>
          )}

          <p className="font-medium">Blood Group:</p>
          {isEdit ? (
            <input
              className="bg-gray-100 max-w-28"
              type="text"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, bloodGroup: e.target.value }))
              }
              value={userData.bloodGroup}
            />
          ) : (
            <p className="text-gray-400">
              {userData.bloodGroup || "Not specified"}
            </p>
          )}

          <p className="font-medium">Birthday:</p>
          {isEdit ? (
            <input
              className="max-w-28 bg-gray-100"
              type="date"
              onChange={(e) =>
                setUserData((prev) => ({ ...prev, dob: e.target.value }))
              }
              value={userData.dob}
            />
          ) : (
            <p className="text-gray-400">{userData.dob || "Not specified"}</p>
          )}

          <p className="font-medium">Address:</p>
          {isEdit ? (
            <p>
              <input
                className="bg-gray-50"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line1: e.target.value },
                  }))
                }
                value={userData.address.line1}
                type="text"
                placeholder="Address Line 1"
              />
              <br />
              <input
                className="bg-gray-50"
                onChange={(e) =>
                  setUserData((prev) => ({
                    ...prev,
                    address: { ...prev.address, line2: e.target.value },
                  }))
                }
                value={userData.address.line2}
                type="text"
                placeholder="Address Line 2"
              />
            </p>
          ) : (
            <p className="text-gray-500">
              {userData.address.line1 || "Not specified"}
              <br />
              {userData.address.line2 || "Not specified"}
            </p>
          )}
        </div>
      </div>

      <div className="mt-10">
        {isEdit ? (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={handleSave}
          >
            Save Information
          </button>
        ) : (
          <button
            className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all"
            onClick={() => setIsEdit(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
