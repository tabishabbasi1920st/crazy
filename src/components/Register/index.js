import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { MainContainer } from "./styledComponents";
import Cookies from "js-cookie";

const apiConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

export default function Register() {
  const navigate = useNavigate();
  const profileInput = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordRepeat: "",
    privacyChecked: false,
  });
  const [image, setImage] = useState(null);
  const [cloudImageUrl, setCloudImageUrl] = useState(null);
  const [apiStatus, setApiStatus] = useState(apiConstants.initial);
  const [picApiStatus, setPicApiStatus] = useState(apiConstants.initial);

  useEffect(() => {
    document.title = "Connect Me - Register";

    if (Cookies.get("chatToken") !== undefined) {
      navigate("/");
    }

    const uploadingUserDpToCloudinary = async () => {
      try {
        setPicApiStatus(apiConstants.inProgress);
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "registered_users_images_preset");

        const cloudName = "dctfbwk0m";
        const resourceType = "image";
        const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

        const options = {
          method: "POST",
          body: data,
        };

        const response = await fetch(apiUrl, options);
        if (response.ok) {
          const fetchedData = await response.json();
          const { secure_url } = fetchedData;
          setCloudImageUrl(secure_url);
          setPicApiStatus(apiConstants.success);
        } else {
          console.error("Error while sending registered user pic in else.");
          setPicApiStatus(apiConstants.failure);
          toast.error("Something went wrong Please select image again", {
            ...toastOptions,
          });
        }
      } catch (error) {
        console.error(
          "Error while sending registered user pic to cloudinary: ",
          error
        );
        setPicApiStatus(apiConstants.failure);
      }
    };
    uploadingUserDpToCloudinary();
  }, [image]);

  const toastOptions = {
    autoClose: 2000,
    style: {
      background: "#0f172a",
      color: "#fff",
    },
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value.trim(),
    }));
  };

  const formValidation = () => {
    const { name, email, password, passwordRepeat, privacyChecked } = formData;

    const isNameValid = (name) => {
      const isNameValid = /^[a-zA-Z]{3,20}$/.test(name);
      return isNameValid;
    };

    const isEmailValid = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(email);
      return isValidEmail;
    };

    const isPasswordValid = (password) => {
      const hasLowercase = /[a-z]/.test(password);
      const hasUppercase = /[A-Z]/.test(password);
      const hasDigit = /\d/.test(password);
      const hasSpecialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
      const isLengthValid = password.length >= 8;

      return (
        hasLowercase &&
        hasUppercase &&
        hasDigit &&
        hasSpecialChar &&
        isLengthValid
      );
    };

    if (image === null) {
      toast.warn("Please select your profile picture.", {
        ...toastOptions,
        autoClose: 3000,
      });
      return false;
    } else if (isNameValid(name) === false) {
      toast.warn("Valid Name is required. Name should not contain space", {
        ...toastOptions,
        autoClose: 3000,
      });
      return false;
    } else if (isEmailValid(email) === false) {
      toast.warn("Valid Email is required", { ...toastOptions });
      return false;
    } else if (isPasswordValid(password) === false) {
      toast.warn(
        "Password should contain alphabets in both case, numbers & symbols ",
        { ...toastOptions, autoClose: 5000 }
      );
      return false;
    } else if (passwordRepeat === "") {
      toast.warn("Valid Password repeat is required", { ...toastOptions });
      return false;
    } else if (password !== passwordRepeat) {
      toast.warn("Passwords do not match", { ...toastOptions });
      return false;
    } else if (privacyChecked === false) {
      toast.warn("Agree with privacy policy", { ...toastOptions });
      return false;
    }

    return true;
  };

  const renderLoader = () => {
    return <Loader height="20" width="20" color="#fff" />;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (formValidation()) {
      try {
        setApiStatus(apiConstants.inProgress);
        const apiUrl = "https://crazychat.onrender.com/register";

        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData, ["imageUrl"]: cloudImageUrl }),
        };

        const response = await fetch(apiUrl, options);
        const fetchedData = await response.json();
        if (response.ok) {
          setApiStatus(apiConstants.success);
          toast.success("Registration Successful! Please Login.", {
            ...toastOptions,
          });
          setTimeout(() => {
            navigate("/login");
          }, 3000);
        } else {
          const message = fetchedData.message;
          toast.error(message, {
            ...toastOptions,
          });
          setApiStatus(apiConstants.failure);
        }
      } catch (error) {
        toast.error("Something went wrong while registering user.", {
          ...toastOptions,
        });
        setApiStatus(apiConstants.failure);
        console.log("Error while register user.", error);
      }
    }
  };

  const handleProfilePicChange = async (e) => {
    const file = e.target.files[0];

    if (!file) {
      setImage(null);
      return;
    }

    if (file.type.startsWith("image/")) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        setImage(reader.result);
      };

      reader.readAsDataURL(file);
    } else {
      setImage(null);
      toast.warn("Please select an image file", { ...toastOptions });
    }
  };

  const backgroundStyle = {
    backgroundImage: image ? `url(${image})` : "",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <MainContainer>
      <div className="card-container">
        <div className="logo-container">
          <p>ConnectMe</p>
        </div>
        <form onSubmit={handleFormSubmit}>
          <p>Create Account</p>

          <div id="profilePictureContainer">
            <button
              style={backgroundStyle}
              type="button"
              id="addPicBtn"
              onClick={() => profileInput.current.click()}
            >
              {image === null && "+"}
              {image !== null &&
                picApiStatus === apiConstants.inProgress &&
                renderLoader()}
            </button>

            <input
              ref={profileInput}
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleProfilePicChange}
            />
          </div>

          <div id="firstGroup">
            <div>
              <label htmlFor="name">Your Name</label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleFormChange}
                placeholder="yourname"
              />
            </div>
            <div>
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleFormChange}
                placeholder="youremail@example.com"
              />
            </div>
          </div>
          <div id="secondGroup">
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleFormChange}
                placeholder="password"
              />
            </div>
            <div>
              <label htmlFor="passwordRepeat">Password Repeat</label>
              <input
                id="passwordRepeat"
                type="password"
                name="passwordRepeat"
                value={formData.passwordRepeat}
                onChange={handleFormChange}
                placeholder="password again"
              />
            </div>
          </div>
          <div className="privacy-policy-container">
            <input
              type="checkbox"
              value={formData.privacyChecked}
              onChange={() => {
                setFormData((prevData) => ({
                  ...prevData,
                  privacyChecked: !prevData.privacyChecked,
                }));
              }}
            />
            <p>
              I agree with <span>privacy policy & terms</span>
            </p>
          </div>
          <button
            className="register-btn"
            type="submit"
            disabled={cloudImageUrl === null}
          >
            {apiStatus === apiConstants.inProgress
              ? renderLoader()
              : "Account Register"}
          </button>
        </form>
        <p className="already-have-account-login">
          Already have an account ?{" "}
          <Link to="/login" style={{ textDecoration: "none" }}>
            <span style={{ color: "#7ca1f3", fontWeight: 600 }}>Login</span>
          </Link>
        </p>
      </div>
      <ToastContainer />
    </MainContainer>
  );
}
