import React from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from 'react'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
  


export default function Landing() {
    const [userData, setUserData] = useState({})
    const handleSubmit = () => {

    }
    return (
        <>
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
                            <Input type="text" className='mt-4' placeholder="Enter Name" />
                            <Input type="text" className='mt-4 mb-4' placeholder="Enter Roll no" />
                            <Input type="text" className='mt-4' placeholder="Enter Section" />
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
