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
import Footer from "@/components/Footer"


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
        const rollno = rollRef.current.value.toUpperCase();
        navigate('/upload', { state: { studentName, rollno, section } });
    }
    return (
        <div className='flex flex-col items-center'>

            <div className="flex flex-row max-sm:flex-col items-center gap-5 my-0">
                <p className='text-9xl font-serif font-medium text-center'>SIKSHA SAHAYAK</p>
                <div className='basis-2/6 py-8'>
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
            <Accordion type="single" collapsible className=' w-[80%] mx-36 my-4 py-10'>
                <AccordionItem value="item-1">
                    <AccordionTrigger>What is the purpose of this platform?</AccordionTrigger>
                    <AccordionContent>
                        This platform aims to facilitate reporting of any issues encountered with the Tessaracts evaluation engine to the college management.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value='item-2'>
                    <AccordionTrigger>What activities are involved on this platform?</AccordionTrigger>
                    <AccordionContent>
                        On this platform, students are encouraged to upload screenshots of Tessaracts assessments, along with any grievances or concerns regarding the evaluation process.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <Footer />
        </div>
    )
}
