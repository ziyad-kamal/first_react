import axios from "axios";

export default function sendRequest(
    type,
    url,
    inputs,
    abortController,
    navigate = () => {}
) {
    const send = async () => {
        const token = localStorage.getItem("token");
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        try {
            let response;
            if (type == "get") {
                response = await axios.get(url, {
                    signal: abortController.signal,
                });
            } else if (type == "post") {
                response = await axios.post(url, inputs, {
                    signal: abortController.signal,
                });
            } else {
                response = await axios.delete(url, {
                    signal: abortController.signal,
                });
            }

            let refreshToken = response.headers["refresh_token"];
            if (refreshToken) {
                localStorage.setItem("token", refreshToken);
            }

            if (response.status === 200) {
                return {
                    success: true,
                    data: response.data,
                    msg: {
                        show: true,
                        type: "success",
                        text: response.data.message,
                    },
                };
            } else if (response.status === 201) {
                return {
                    success: true,
                    data: response.data,
                    msg: {
                        show: true,
                        type: "success",
                        text: response.data.message,
                    },
                };
            }
        } catch (error) {
            if (error.response) {
                let refreshToken = error.response.headers["refresh_token"];
                if (refreshToken) {
                    localStorage.setItem("token", refreshToken);
                }

                const status = error.response.status;
                if (status === 401) {
                    localStorage.removeItem("token");
                    navigate("/login");
                } else if (status === 404) {
                    return {
                        success: false,
                        msg: {
                            show: true,
                            type: "danger",
                            text: error.response.data.message,
                        },
                    };
                } else if (status === 422) {
                    return {
                        success: false,
                        msg: {
                            show: true,
                            type: "danger",
                            text: "correct errors below each input",
                        },
                        errors: error.response.data.errors,
                    };
                } else if (status === 429) {
                    return {
                        success: false,
                        msg: {
                            show: true,
                            type: "danger",
                            text: "you send many requests, try again later",
                        },
                    };
                } else {
                    return {
                        success: false,
                        msg: {
                            show: true,
                            type: "danger",
                            text: "something went wrong",
                        },
                    };
                }
            } else if (error.request) {
                if (!axios.isCancel(error)) {
                    return {
                        success: false,
                        msg: {
                            show: true,
                            type: "danger",
                            text: "no response received,try again later.",
                        },
                    };
                }
            } else {
                return {
                    success: false,
                    msg: {
                        show: true,
                        type: "danger",
                        text: "something went wrong",
                    },
                };
            }
        }
    };

    return send();
}
