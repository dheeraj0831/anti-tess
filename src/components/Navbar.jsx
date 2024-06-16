import React, { useRef } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { Input } from "@/components/ui/input"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import axios from 'axios'

const Navbar = () => {
    const navigate = useNavigate();
    const userNameRef = useRef(null);
    const passRef = useRef(null);

    let user = null
    const token = localStorage.getItem('token');
    console.log(token)

    function parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
    if (token) {
        user = parseJwt(token);
    }
    console.log(user)

    const handleLogin = async () => {
        const userName = userNameRef.current.value;
        const pass = passRef.current.value;

        try {
            console.log("log")
            const res = await axios({
                url: "http://localhost:3000/api/signin",
                method: "post",
                data: {
                    username: userName,
                    password: pass
                }
            });
            const jwtToken = res.data.token;
            localStorage.setItem("token", jwtToken);
            navigate("/all-issues");
        }
        catch {

        }
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <>
            <nav className='dark px-4 py-4 flex items-center justify-between sticky'>
                <Link to="/" className=' text-xl font-bold'>Siksha Sahayak</Link>
                <div className='flex items-center gap-16'>
                    <Link to='/all-issues' className=' hover:text-gray-300'>All Issues</Link>
                    {!user ? (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Login</Button>
                            </DialogTrigger>

                            <DialogContent className='max-w-md'>
                                <DialogHeader>
                                    <DialogTitle>This is for Verifiers Only</DialogTitle>
                                </DialogHeader>
                                <Input type="text" className='mt-4' placeholder="Enter UserName" ref={userNameRef} />
                                <Input type="text" className='mt-4 mb-4' placeholder="Enter Password" ref={passRef} />
                                <Button onClick={handleLogin}>Login</Button>
                            </DialogContent>
                        </Dialog>
                    ) : (<Button onClick={handleLogout}>Logout</Button>)}
                </div>
            </nav><Outlet />
        </>
    )
}

export default Navbar
