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


const Probpreview = ({ problem, user }) => {

    const { studentName, rollno, section, imageUrl, description, subject } = problem
    const shortDesc = description.substring(0, 50) + "..."
    const [changed, setChanged] = useState(false);
    const handleCLick = async (action) => {
        const response = await axios({
            url: `${import.meta.env.VITE_SERVER_URL}/api/approve`,
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
        window.location.reload();
    }
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Card className="w-full transform transition-transform hover:scale-105 cursor-pointer">
                        <CardHeader>
                            <CardTitle>{studentName}</CardTitle>
                            <CardDescription>{section}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <img src={imageUrl} alt={rollno} className="w-full h-32" />
                            {shortDesc}
                        </CardContent>
                    </Card>
                </DialogTrigger>
                <DialogContent className='max-w-7xl'>
                    <Card className='m-2 bg-transparent border-0 '>
                        <CardHeader>
                            <CardTitle>{studentName}</CardTitle>
                            <CardDescription className="flex justiy-evenly gap-5">
                                {rollno}
                                <Badge variant="secondary">{section}</Badge>
                                <Badge variant="secondary">{subject}</Badge>
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='flex flex-col items-center gap-5'>
                            <img className="w-full max-h-[28rem]" src={imageUrl} alt={rollno} />
                            {description}
                        </CardContent>
                        <CardFooter className='flex justify-evenly'>
                            {user && (
                                <>
                                    <Button className='w-1/3 bg-slate-700 hover:bg-green-600' onClick={() => handleCLick('approved')} disabled={changed}>Approve</Button>
                                    <Button className='w-1/3' onClick={() => handleCLick('rejected')} disabled={changed}>Reject</Button>
                                </>
                            )}

                        </CardFooter>
                    </Card>
                </DialogContent>
            </Dialog>

        </>
    )
}

export default Probpreview
