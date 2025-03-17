const BaseUrl = "https://socialappbackend-n15j.onrender.com/"
// const BaseUrl = "http://localhost:4000/"


export const Apis = {

    /*-----------------------------------------------------------------------------------------------------------------------------
    Authentication Apis
    ------------------------------------------------------------------------------------------------------------------------------*/


    signupApi: BaseUrl + "api/v1/auth/signup",
    loginApi: BaseUrl + "api/v1/auth/login",
    logout: BaseUrl + "api/v1/auth/logout",
    otpApi: BaseUrl + "api/v1/auth/sendotp",
    followUser: BaseUrl + "/api/v1/auth/follow/",
    unfollowUser: BaseUrl + "/api/v1/auth/unfollow/",
    getFollowersAndFollowing: BaseUrl + "api/v1/auth/followers-following",

    /*-----------------------------------------------------------------------------------------------------------------------------
                                                 User Apis
    ------------------------------------------------------------------------------------------------------------------------------*/

    getUserDetail: BaseUrl + "api/v1/profile/getUserDetails/:id",
    last30DayUser: BaseUrl + "api/user/user-count-30-days",
    updateProfile: BaseUrl + "api/v1/profile/updateProfile",
    deleteProfile: BaseUrl + "api/v1/profile/deleteProfile",
    contactUs: BaseUrl + "api/v1/reach/contact",

    /*-----------------------------------------------------------------------------------------------------------------------------
                                                 Post Apis
    ------------------------------------------------------------------------------------------------------------------------------*/

    createPost: BaseUrl + "api/v1/post/createPost",
    deletePost: BaseUrl + "api/v1/post/deletePost",
    editPost: BaseUrl + "api/v1/post/editPost",
    getAllPost: BaseUrl + "api/v1/post/getAllPosts",
    getCreatorPosts: BaseUrl + "api/v1/post/getCreatorPosts",
    getPostdetail: BaseUrl + "api/v1/post/getPostdetails",
    togglelike: BaseUrl + "api/v1/post/toggleLike",
    createComment: BaseUrl + "api/v1/post/createComment",

}
