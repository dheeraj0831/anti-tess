import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Specific from "./Specific"


const Probpreview = ({ problem, user }) => {

    const { studentName, rollno, section, imageUrl, description, subject } = problem
    const shortDesc = description.substring(0, 50) + "..."

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{studentName}</CardTitle>
                <CardDescription>{section}</CardDescription>
            </CardHeader>
            <CardContent>
                <img src={imageUrl} alt={rollno} className="w-full h-32" />
                {shortDesc}
            </CardContent>
            <CardFooter >
                {/* <p className="w-full">{desc}</p> */}
                <Specific name={studentName} rollno={rollno} section={section} subject={subject} imageUrl={imageUrl} description={description} user={user} />
            </CardFooter>
        </Card>

    )
}

export default Probpreview
