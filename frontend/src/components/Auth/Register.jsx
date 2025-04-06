// import { useLocation } from "react-router-dom"; 
import { useState } from "react";
import axios from "axios";

function Register() {

    // const location = useLocation();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    // useEffect(() => {
    //     setFormData({ email: "", password: "" });
    // }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log("Submitting formData:", formData);

        if (!formData.name || !formData.email || !formData.password) {
            console.error("All fields are required");
            return;
        }
        try {
            const res = await axios.post("http://localhost:5000/api/auth/register", formData);
            console.log("User Registered:", res.data);
        } catch (error) {
            console.error("Error Registering User:", error.response.data);
        }
    };

    return (
     

        <div className=" px-4 py-4 justify-content-center align-items-center" style={{display : "flex"}}>
            <form onSubmit={handleSubmit}style={{width : "50%"}}>

                
            <div class="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input type="text" class="form-control" id="exampleInputName1" name="name"  value={formData.name} onChange={handleChange} placeholder="Enter Name" />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>


                <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={formData.email}  onChange={handleChange}  placeholder="Enter email" />
                    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" class="form-control" id="exampleInputPassword1" name="password"  value={formData.password} onChange={handleChange}  placeholder="Password" />
                </div>
                {/* <div class="form-group form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                    <label class="form-check-label" for="exampleCheck1">Check me out</label>
                </div> */}
                <button type="submit" class="btn btn-primary">Submit</button>
            </form>

        </div>
    );
}

export default Register;
