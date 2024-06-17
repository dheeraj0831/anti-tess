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
    const { studentName, rollno, section, imageUrl, description, subject, status, unitTest } = problem
    const shortDesc = description.substring(0, 50) + "..."
    const [changed, setChanged] = useState(false);

    const handleClick = async (action) => {
        try {
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

            if (response.status === 200) {
                setChanged(true);

                if (action === "delete") {
                    const publicId = extractPublicIdFromUrl(imageUrl);

                    await axios({
                        url: `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/destroy`,
                        method: "post",
                        auth: {
                            username: import.meta.env.VITE_CLOUDINARY_API_KEY,
                            password: import.meta.env.VITE_CLOUDINARY_API_SECRET
                        },
                        data: {
                            public_id: publicId
                        }
                    });
                }
            }
        } catch (error) {
            console.error("Error handling the action:", error);
        } finally {
            setChanged(false);
            window.location.reload();
        }
    };

    const extractPublicIdFromUrl = (url) => {
        const parts = url.split('/');
        const publicIdWithExtension = parts[parts.length - 1];
        const publicId = publicIdWithExtension.split('.')[0];
        return publicId;
    };

    return (
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
                            <Badge variant="secondary">{unitTest}</Badge>
                        </CardDescription>
                    </CardHeader>
                    <CardContent className='flex flex-col items-center gap-5'>
                        <img className="w-full max-h-[28rem]" src={imageUrl} alt={rollno} />
                        {description}
                    </CardContent>
                    <CardFooter className='flex justify-evenly'>
                        {user && (status === "default") && (
                            <>
                                <Button className='w-1/3 bg-slate-700 hover:bg-green-600' onClick={() => handleClick('approved')} disabled={changed}>Approve</Button>
                                <Button className='w-1/3' onClick={() => handleClick('rejected')} disabled={changed}>Reject</Button>
                            </>
                        )}
                        {user && (status === "rejected") && (
                            <>
                                <Button className='w-1/3 bg-slate-700 hover:bg-green-600' onClick={() => handleClick('approved')} disabled={changed}>Approve</Button>
                                <Button className='w-1/3' onClick={() => handleClick('delete')} disabled={changed}>Delete</Button>
                            </>
                        )}
                    </CardFooter>
                </Card>
            </DialogContent>
        </Dialog>
    )
}

export default Probpreview
