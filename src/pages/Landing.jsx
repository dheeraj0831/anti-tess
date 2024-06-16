import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useRef } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

import { useNavigate } from 'react-router-dom'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import axios from 'axios'


export default function Landing() {
    const [section, setSection] = useState(null);
    const navigate = useNavigate();
    const nameRef = useRef(null);
    const rollRef = useRef(null);
    const userNameRef = useRef(null);
    const passRef = useRef(null);
    const handleSectionChange = (value) => {
        setSection(value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const studentName = nameRef.current.value;
        const rollno = rollRef.current.value;
        navigate('/upload', { state: { studentName, rollno, section } });
    }
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
    return (
        <>
            <div className="flex justify-end m-3">
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
            </div>
            <div className="flex flex-row items-center">
                <div className="basis-4/6">
                    <p className='text-9xl  font-serif text-center'>ANTI-TESS</p>
                </div>
                <div className='basis-2/6 py-20'>
                    <Card className='mr-10'>
                        <CardHeader>
                            <CardTitle>Enter Your Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Input type="text" className='mt-4' placeholder="Enter Name" ref={nameRef} required />
                                <Input type="text" className='mt-4 mb-4' placeholder="Enter Roll no" ref={rollRef} required />
                                <Select className="w-full mb-4" onValueChange={handleSectionChange} required>
                                    <SelectTrigger >
                                        <SelectValue placeholder="Section" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="fs-elite">FS-ELITE</SelectItem>
                                        <SelectItem value="fs-a1" >FS-A1</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button className="mt-4" type="submit">Submit</Button>
                            </form>
                        </CardContent>
                    </Card>

                </div>
            </div>
            <div>
                <Accordion type="single" collapsible className='mx-10'>
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What is this for?</AccordionTrigger>
                        <AccordionContent>
                            This platform is to bring all the faults in the Tessaracts evaluation engine to the management of the college
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value='item-2'>
                        <AccordionTrigger>What exactly will you be doing on this platform</AccordionTrigger>
                        <AccordionContent>
                            You will be uploading screen-shots of all the evaluations of the tessaracts asesments along with the grievences with that particular evaluation
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

            </div>
        </>
    )
}
