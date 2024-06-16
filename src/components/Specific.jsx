import React from 'react'
import axios from 'axios'
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { useState } from 'react'
export default function Specific({ name, rollno, section, imageUrl, description, user }) {
    const [changed, setChanged] = useState(false);
    const handleCLick = async (action) => {
        const response = await axios({
            url: "http://localhost:3000/api/approve",
            method: "put",
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token")
            },
            data: {
                imageUrl: imageUrl,
                approval: action
            }
        });
        if (response.status == 200) {
            setChanged(true);
        }
    }

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Open</Button>
                </DialogTrigger>
                <DialogContent className='max-w-7xl'>
                    <Card className='m-2 bg-transparent border-0 '>
                        <CardHeader>
                            <CardTitle>{name}</CardTitle>
                            <CardDescription className="flex justiy-evenly gap-5">
                                {rollno}
                                <Badge variant="secondary">{section}</Badge>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='flex flex-col items-center gap-5'>
                            <img className="w-full max-h-96" src={imageUrl} alt={rollno} />
                            {description}
                        </CardContent>
                        <CardFooter className='flex justify-evenly'>
                            {user && (
                                <>
                                    <Button className='w-1/3 bg-slate-700 hover:bg-green-600' onClick={() => handleCLick('approved')} disabled={changed}>Approve</Button>
                                    <Button className='w-1/3' onClick={() => handleCLick('rejected')} disabled={changed}>Reject</Button>
                                </>
                            )
                            }

                        </CardFooter>
                    </Card>
                </DialogContent>
            </Dialog>

        </>
    )
}
