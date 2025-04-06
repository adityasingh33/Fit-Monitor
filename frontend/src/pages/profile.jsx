import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import './profile.css';
function Profile() {
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: "",
        weight: "",
        height: "",
        gender: "",
        age: ""
    });

    const [error, setError] = useState("");

    useEffect(() => {
        setFormData({
            name: "",
            weight: "",
            height: "",
            gender: "",
            age: ""
        })
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

         // Convert form data to proper types before sending
    const cleanedFormData = {
        name: formData.name.trim(),
        weight: Number(formData.weight.trim()),
        height: Number(formData.height.trim()),
        gender: formData.gender.trim(),
        age: Number(formData.age.trim())
    };


        console.log("Submitting formdata", cleanedFormData);


        if (!cleanedFormData.name || !cleanedFormData.weight || !cleanedFormData.height || 
            !cleanedFormData.gender || !cleanedFormData.age) {
            setError("All fields are required");
            console.error("All fields are required");
            return;
        }
        try {
            // const res = await axios.put("http://localhost:5000/api/profile", formData);

            // localStorage.setItem("token", res.data.token);
            // login(res.data.token);

            // console.log("User gave all the data", res.data);

            const token = localStorage.getItem('token');
            if (!token) {
                setError("Please login first");
                navigate('/login');
                return;
            }
    
            // Make API request with token in headers
            const res = await axios.put(
                "http://localhost:5000/api/profile", 
                cleanedFormData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
    
            console.log("Profile updated:", res.data);
            setError("");

        } catch (error) {
            console.error("Error filling the data: ", error.response?.data || "Something went wrong ");


             // Handle token expiration
        if (error.response?.data?.error === 'jwt expired') {
            localStorage.removeItem('token'); // Clear expired token
            setError("Session expired. Please login again");
            navigate('/login');
            return;
        }


            setError(error.response?.data?.message || "Invalid Credentials");
        }
    };

    return (
        //  <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
        //      <div className="container py-5 h-100">
        //       <div className="row d-flex justify-content-center align-items-center h-100">
        //         <div className="col col-lg-6 mb-4 mb-lg-0">
        //           <div className="card mb-3" style={{ borderRadius: "0.5rem" }}>
        //             <div className="row g-0">
        //               <div className="col-md-4 gradient-custom text-center text-white"
        //                 style={{
        //                     bordertopleftradius: ".5rem",
        //                      borderbottomleftradius: ".5rem"
        //                 }}>
        //                 <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
        //                   alt="Avatar" class="img-fluid my-5" style={{width: "80px"}} />
        //                 <h5>{formData.name || 'No name'}</h5>
        //                 <p>{formData.gender}</p>
        //                 <i class="far fa-edit mb-5"></i>
        //               </div>
        //               <div class="col-md-8">
        //                 <div class="card-body p-4">
        //                   <h6>Personal Details</h6>
        //                   <hr class="mt-0 mb-4" />
        //                   <div class="row pt-1">
        //                     <div class="col-6 mb-3">
        //                       <h6>Height</h6>
        //                       <p class="text-muted">{formData.height}</p>
        //                     </div>
        //                     <div class="col-6 mb-3">
        //                       <h6>Weight</h6>
        //                       <p class="text-muted">{formData.weight}</p>
        //                     </div>
        //                   </div>

        //                   <div class="row pt-1">
        //                     <div class="col-6 mb-3">
        //                       <h6>Age</h6>
        //                       <p class="text-muted">{formData.age}</p>
        //                     </div>

        //                   </div>
        //                   <div class="d-flex justify-content-start">
        //                     <a href="#!"><i class="fab fa-facebook-f fa-lg me-3"></i></a>
        //                     <a href="#!"><i class="fab fa-twitter fa-lg me-3"></i></a>
        //                     <a href="#!"><i class="fab fa-instagram fa-lg"></i></a>
        //                   </div>
        //                  </div>
        //               </div>
        //             </div>
        //           </div>
        //         </div>
        //       </div>
        //     </div> 

        //   </section>

        <section className="vh-100" style={{ backgroundColor: "#f4f5f7" }}>
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-lg-6 mb-4 mb-lg-0">
                        <form onSubmit={handleSubmit}>
                            <div className="card mb-3" style={{ borderRadius: "0.5rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-4 gradient-custom text-center text-white"
                                        style={{
                                            bordertopleftradius: ".5rem",
                                            borderbottomleftradius: ".5rem"
                                        }}>
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                            alt="Avatar" className="img-fluid my-5" style={{ width: "80px" }} />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="form-control text-center"
                                            placeholder="Name"
                                            style={{ color: "white", background: "transparent", border: "none" }}
                                        />
                                        {/* <input
                                            type="text"
                                            name="gender"
                                            value={formData.gender}
                                            onChange={handleChange}
                                            className="form-control text-center"
                                            placeholder="Gender"
                                            style={{ color: "white", background: "transparent", border: "none" }}
                                        /> */}
                                        <i className="far fa-edit mb-5"></i>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body p-4">
                                            <h6>Personal Details</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Height</h6>
                                                    <input
                                                        type="text"
                                                        name="height"
                                                        value={formData.height}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        placeholder="Height"
                                                    />
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Weight</h6>
                                                    <input
                                                        type="text"
                                                        name="weight"
                                                        value={formData.weight}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        placeholder="Weight"
                                                    />
                                                </div>
                                            </div>

                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Age</h6>
                                                    <input
                                                        type="text"
                                                        name="age"
                                                        value={formData.age}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                        placeholder="Age"
                                                    />
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Gender</h6>
                                                    <select
                                                        name="gender"
                                                        value={formData.gender}
                                                        onChange={handleChange}
                                                        className="form-control"
                                                    >
                                                        <option value="">Select Gender</option>
                                                        <option value="male">Male</option>
                                                        <option value="female">Female</option>
                                                        <option value="other">Other</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <button type="submit" className="btn btn-primary mt-3">Save Profile</button>

                                            <div className="d-flex justify-content-start mt-4">
                                                <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                                                <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                                                <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>

    );
}

export default Profile;