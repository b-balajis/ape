const Logout = () => {

    localStorage.clear();
    //clear redux state
    window.location.href = "/signin";

}

export default Logout
