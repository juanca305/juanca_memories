import axios from "axios";
import {jwtDecode} from 'jwt-decode';


export const createOrGetUser = async (response) => {
    
    const decoded = jwtDecode(response.credential) ;
    const { name, picture, sub, given_name } = decoded;

    const user = {
        _id: sub,
        _type: 'user',
        userName: name,
        image: picture,
        given_name: given_name
    }

     console.log('DECODED FROM UTILS', decoded);
     console.log('USER FROM UTILS', user);
    //await axios.post(`http://localhost:3000/api/auth`, user);
   
    localStorage.setItem('user', JSON.stringify(user));
   
     return user;
}