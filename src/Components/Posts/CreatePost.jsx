import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Apis } from "../../All_Apis";

const { getUserDetail, createPost } = Apis;

const CreatePost = () => {
    const [description, setDescription] = useState("");
    const [postdata, setPostdata] = useState(null); // Changed from video to postdata
    const [postdataName, setPostdataName] = useState(""); // Changed from videoName to postdataName
    const [status, setStatus] = useState("Published");
    const [userType, setUserType] = useState("");
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const postdataInputRef = useRef(null); // Changed from videoInputRef to postdataInputRef

    // Fetch user details
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(getUserDetail, {
                    headers: {
                        Authorization: `Bearer ${Cookies.get("cookie")}`,
                    },
                });
                console.log("response",response); 
                setUserType(response.data.data.accountType);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchUserData();
    }, []);

    // Handle validation
    const validate = () => {
        const newErrors = {};
        if (!description.trim()) newErrors.description = "Description is required.";
        if (!postdata) newErrors.postdata = "Please upload a video or image."; // Changed from video to postdata
        if (!status) newErrors.status = "Status is required.";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle file selection
    const handlePostdataChange = (e) => { // Changed from handleVideoChange to handlePostdataChange
        const file = e.target.files[0];
        if (file) {
            setPostdata(file);
            setPostdataName(file.name);
        }
    };

    const handleCreatePost = async () => {
        if (!validate()) return;

        if (userType !== "Visitor") {
            alert("Unauthorized: Only Visitors can create posts");
            return;
        }

        const formData = new FormData();
        formData.append("description", description);
        formData.append("status", status);
        formData.append("postdata", postdata); // Changed from video to postdata

        try {
            setLoading(true);
            await axios.post(createPost, formData, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("cookie")}`,
                },
            });

            alert("Post created successfully");
            setDescription("");
            setStatus("Draft");
            setPostdata(null);
            setPostdataName("");
            if (postdataInputRef.current) postdataInputRef.current.value = "";

            navigate("/");
        } catch (error) {
            alert("Failed to create post: " + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 m-4 bg-white shadow-lg shadow-orange-300 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Create Post</h2>

            <div className="space-y-4">
                {/* Postdata Upload */}
                <div>
                    <label className="block text-lg font-medium mb-1">Post (Video/Image)</label>
                    <div className="relative">
                        <input
                            type="file"
                            accept="video/*,image/*"
                            onChange={handlePostdataChange}
                            ref={postdataInputRef}
                            className="hidden"
                            id="postdataInput"
                        />
                        <label
                            htmlFor="postdataInput"
                            className="w-full p-2 border rounded cursor-pointer bg-gray-100 text-center"
                        >
                            {postdataName || "Choose a video or image"}
                        </label>
                    </div>
                    {errors.postdata && <p className="text-red-500 text-sm">{errors.postdata}</p>}
                </div>

                {/* Description */}
                <div>
                    <label className="block text-lg font-medium mb-1">Description</label>
                    <textarea
                        className="w-full p-2 border rounded"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
                </div>

                {/* Status Dropdown */}
                <div>
                    <label className="block text-lg font-medium mb-1">Status</label>
                    <select
                        className="w-full p-2 border rounded bg-white"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="Draft">Draft</option>
                        <option value="Published">Published</option>
                    </select>
                    {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        onClick={handleCreatePost}
                        className="transition-transform duration-200 hover:scale-95 active:scale-110 w-full py-2 mb-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-md"
                        disabled={loading}
                    >
                        {loading ? "Uploading..." : "Create Post"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePost;