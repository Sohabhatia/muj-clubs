import axios from 'axios';



export const register = async (data) => {
  try {
    const res = await axios.post('/api/v1/users/register', {
      data
    });
    console.log(res);

    /*if (res.data.status === 'success') {
      //showAlert('success', 'Logged in successful!');
      window.location.replace('/');
    }*/
  } catch (error) {
    console.log(error);
  }
};
