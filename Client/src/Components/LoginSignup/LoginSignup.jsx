import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import user_icon from '../Assets/person.png';
import password_icon from '../Assets/password.png';
import imagelogin from '../../Assets/diskominfo.png';
import background_login from "../Assets/login_page.png";
import { TabTitle } from '../../TabName';

const Login = () => {
    TabTitle('Portal Diskominfo')
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [message, setMsg] = useState('');
    const navigate = useNavigate('');
    useEffect(() => {
        Logout();
    }, [])

    const Auth = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/account/login', {
                "username": username,
                "password": password,
                "role": role
            }, {
            })
            if (role === "admin") {
                navigate('/homepage');
            } else if (role === "peserta_magang") {
                navigate('/user/homepage');
            }
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.message);
            }
        }
    }

    const Logout = async () => {
        try {
            await axios.delete('http://localhost:3000/account/logout');
        } catch (error) {
            console.log("Error during logout:", error);
        }
    }

    return (
        <section className="hero is-fullheight" style={{ backgroundImage: `url(${background_login})`, backgroundSize: 'cover' }}>
            <div className="hero-body">
                <div className="container">
                    <div className="columns is-centered">
                        <div className="column is-4-desktop">
                            <form onSubmit={Auth} className="box">
                                <p className='has-text-centered'>{message}</p>
                                <img src={imagelogin} alt="" />
                                <div className="field">
                                    <label className="label">Username</label>
                                    <div className="control has-icons-left">
                                        <input
                                            type="text"
                                            className="input"
                                            placeholder="Username"
                                            value={username}
                                            onChange={(e) => setUser(e.target.value)}
                                        />
                                        <span className="icon is-small is-left">
                                            <img src={user_icon} alt="User Icon" />
                                        </span>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control has-icons-left">
                                        <input
                                            type="password"
                                            className="input"
                                            placeholder="Passowrd"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                        <span className="icon is-small is-left">
                                            <img src={password_icon} alt="User Icon" />
                                        </span>
                                    </div>
                                </div>
                                <div className="field has-text-centered"> {/* Tambahkan class has-text-centered di sini */}
                                    <label className="label">Role</label>
                                    <div className="control">
                                        <label className="radio">
                                            <input
                                                type="radio"
                                                name="userType"
                                                value="admin"
                                                checked={role === "admin"}
                                                onChange={() => setRole("admin")}
                                            />
                                            <span className="ml-2">Admin</span>
                                        </label>
                                        <label className="radio">
                                            <input
                                                type="radio"
                                                name="userType"
                                                value="peserta_magang"
                                                checked={role === "peserta_magang"}
                                                onChange={() => setRole("peserta_magang")}
                                            />
                                            <span className="ml-2">Peserta Magang</span>
                                        </label>
                                    </div>
                                </div>
                                <div className="field">
                                    <button className="button is-success is-fullwidth">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;