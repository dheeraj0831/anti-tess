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
import axios from 'axios'


export default function Landing() {
    const [section, setSection] = useState(null);
    const navigate = useNavigate();
    const nameRef = useRef(null);
    const rollRef = useRef(null);
    const handleSectionChange = (value) => {
        setSection(value);
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        const studentName = nameRef.current.value;
        const rollno = rollRef.current.value;
        navigate('/upload', { state: { studentName, rollno, section } });
    }
    return (
        <>

            <div className="flex flex-row items-center my-0">
                <div className="basis-4/6">
                    <p className='text-9xl font-serif font-medium text-center'>SIKSHA SAHAYAK</p>
                </div>
                <div className='basis-2/6 py-20'>
                    <Card className='mr-10'>
                        <CardHeader>
                            <CardTitle>Enter Your Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit}>
                                <Input type="text" className='mt-4' placeholder="Enter Name" ref={nameRef} required />
                                <Input type="text" className='mt-4 mb-4' pattern="^2[12][Bb][Dd][a-zA-Z0-9]{6}$" placeholder="Enter Roll no" ref={rollRef} required />
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
            <Accordion type="single" collapsible className=' mx-36 my-4'>
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is the purpose of this platform?</AccordionTrigger>
                    <AccordionContent>
                        This platform aims to facilitate reporting of any issues encountered with the Tessaracts evaluation engine to the college management.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-2'>
                    <AccordionTrigger>What activities are involved on this platform?</AccordionTrigger>
                    <AccordionContent>
                        On this platform, users are encouraged to upload screenshots of Tessaracts assessments, along with any grievances or concerns regarding the evaluation process.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    )
}
