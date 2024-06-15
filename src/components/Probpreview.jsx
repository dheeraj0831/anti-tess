import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


const Probpreview = ({ imageUrl, name, rollno, section, desc }) => {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{section}</CardDescription>
            </CardHeader>
            <CardContent>
                <img src={imageUrl} alt={rollno} className="w-full" />
            </CardContent>
            <CardFooter>
                <p>{desc}</p>
            </CardFooter>
        </Card>

    )
}

export default Probpreview
