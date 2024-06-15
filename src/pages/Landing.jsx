import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
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
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
export default function Landing() {
    const [section, setSection] = useState(null)
    const navigate = useNavigate()
    const nameRef = useRef(null);
    const rollRef = useRef(null)

    const handleSectionChange = (value) => {
        setSection(value);
    };


    const handleSubmit = () => {
        const name = nameRef.current.value;
        const rollno = rollRef.current.value;
        // const section = secRef.current.value;
        // console.log(section)
        navigate('/upload', { state: { name, rollno, section } });
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
                        <Input type="text" className='mt-4' placeholder="Enter UserName" />
                        <Input type="text" className='mt-4 mb-4' placeholder="Enter Password" />
                        <Button>Login</Button>
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
                            <Input type="text" className='mt-4' placeholder="Enter Name" ref={nameRef} />
                            <Input type="text" className='mt-4 mb-4' placeholder="Enter Roll no" ref={rollRef} />
                            <Select className="w-full" onValueChange={handleSectionChange}>
                                <SelectTrigger >
                                    <SelectValue placeholder="Section" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="fs-elite">FS-ELITE</SelectItem>
                                    <SelectItem value="fs-a1" >FS-A1</SelectItem>
                                </SelectContent>
                            </Select>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={handleSubmit}>Submit</Button>
                        </CardFooter>
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
