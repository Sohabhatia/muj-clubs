import axios from 'axios'

export const login = async( email , password) => {
   
    try{
        const res = await axios.post('/api/v1/users/login', {
            email,
            password
          });
    if(res.data.status === 'success'){
        window.location.replace('/clubs');
    }else{
        console.log(res);
    }

    }catch(error){
        console.log(error);
    }
}