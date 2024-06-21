import axios from "../redux/Axioss";

// set config
const setConfig = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// axios getter
const axioGet = async (route) => await axios.get(route);
const axioGetHeader = async (route, token) => await axios.get(route, setConfig(token));

// axios creators
const axioPost = async (route, credentials) => await axios.post(route, credentials);
const axioPostHeader = async (route, credentials, token) =>  await axios.post(route, credentials, setConfig(token));

// axios update
const axioPatch = async (route, credentials) => await axios.patch(route, credentials);
const axioPatchHeader = async (route, credentials, token) => await axios.patch(route, credentials, setConfig(token));

// axios delete
const axioDelete = async (route) => await axios.delete(route);
const axioDeleteHeader = async (route, token) => await axios.delete(route, setConfig(token));


export const getToken = (ThunkAPI) => {
  return  ThunkAPI.getState().auth.user?.token ||
    JSON.parse(localStorage.getItem("user"))?.token;
}
export const thunkError = (error) => {
  // return  (error.response &&
  //     error.response.data &&
  //     error.response.data.message) ||
  //   error.message.toString() ||
  //   error.toString();

    if (error.response && error.response.data) {
      return {
        message: error.response.data.message || 'Something went wrong',
        error: error.response.data.error || error.message,
      };
    }
    return {
      message: 'Network error',
      error: error.message,
    };
 
}

const requestHandler = {
  axioDeleteHeader,
  axioGet,
  axioGetHeader,
  axioPost,
  axioPostHeader,
  axioPatch,
  axioPatchHeader,
  axioDelete,
  getToken,
};

export default requestHandler;