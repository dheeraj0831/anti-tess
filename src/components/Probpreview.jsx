import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import Specific from "./Specific"


const Probpreview = ({ imageUrl, name, rollno, section, desc }) => {

    const shortDesc = desc.substring(0, 100) + "..."

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{section}</CardDescription>
            </CardHeader>
            <CardContent>
                <img src={imageUrl} alt={rollno} className="w-full" />
                {shortDesc}
            </CardContent>
            <CardFooter >
                {/* <p className="w-full">{desc}</p> */}
                <Specific name={name} rollno={rollno} section={section} imageUrl={imageUrl} description={desc} />
            </CardFooter>
        </Card>

    )
}

export default Probpreview
