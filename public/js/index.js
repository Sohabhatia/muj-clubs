import '@babel/polyfill';

import { login } from './login';
import { logout } from './logout';
import { register } from './register';



const regitserBtn = document.getElementById('register-form');
const loginBtn = document.getElementById('login-form');
const logoutBtn  = document.getElementById('logout-btn');



if(loginBtn){
    
    loginBtn.addEventListener('click', e => {
        e.preventDefault();
        
        const email = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        login(email, password);

    } )
}

if(regitserBtn){
    regitserBtn.addEventListener('click', e => {
        const data = {
            name : document.getElementById('name').value,
            RegisterationNumber : document.getElementById('registeration').value,
            ClubName : document.getElementById('club-name').value,
            Degree : document.getElementById('degree').value,
            Year : document.getElementById('year').value,
            Branch : document.getElementById('branch').value,
            ContactNumber : document.getElementById('contact').value
        } 
        //console.log(data);
        register(data);
    });
}

if(logoutBtn){
    logoutBtn.addEventListener('click', logout);
}


