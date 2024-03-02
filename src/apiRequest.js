const apiRequest = async (url = "", options = null, errMsg = null) => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw Error("Please reload the app");
        }
    } catch (e) {
        errMsg = e.message;
    } finally {
        return errMsg;
    }
};

export default apiRequest;
