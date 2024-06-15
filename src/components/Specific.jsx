import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
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
export default function Specific({ name, rollno, section, imageUrl, description }) {
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
                            <img src={imageUrl} alt={rollno} />
                            {description}
                        </CardContent>
                        <CardFooter className='flex justify-evenly'>
                            <Button className='w-1/3 bg-slate-700 hover:bg-green-600'>Approve</Button>
                            <Button className='w-1/3'>Reject</Button>
                        </CardFooter>
                    </Card>
                </DialogContent>
            </Dialog>

        </>
    )
}
