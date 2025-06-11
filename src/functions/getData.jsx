import axios from "axios";

export default function getData(url, cancelTokenSource) {
    const get = async () => {
        try {
            const response = await axios.get(url, {
                cancelToken: cancelTokenSource.token,
            });

            if (response.status === 200) {
                return {
                    cancelToken: cancelTokenSource,
                    success: true,
                    data: response.data.data,
                };
            }
        } catch (error) {
            if (error.response) {
                const status = error.response.status;
                if (status === 429) {
                    return {
                        cancelToken: cancelTokenSource,
						success: false,
                        msg: {
                            show: false,
                            type: "danger",
                            text: "you send many requests, try again later",
                        },
                    };
                }else{
					return {
                        cancelToken: cancelTokenSource,
						success: false,
                        msg: {
                            show: true,
                            type: "danger",
                            text: "something went wrong",
                        },
                    };
				}
            } else if (error.request) {
                return {
                    cancelToken: cancelTokenSource,
					success: false,
                    msg: {
                        show: true,
                        type: "danger",
                        text: "no response received,try again later.",
                    },
                };
            } else {
                if (!axios.isCancel(error)) {
                    return {
                        cancelToken: cancelTokenSource,
						success: false,
                        msg: {
                            show: true,
                            type: "danger",
                            text: "something went wrong",
                        },
                    };
                }
            }
        }
    };

    return get();
}
