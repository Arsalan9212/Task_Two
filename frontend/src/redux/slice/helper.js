export const url = 'http://localhost:4000/api';


export const getToken = () => {
  return localStorage.getItem('token');
};

// export const setHeaders = () => {
//   const headers = {
//     headers: {
//       'x-auth-token': localStorage.getItem('token'),
//     },
//   };

//   return headers;
// };