import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const Problem = () => {
    const [imagePreview, setImagePreview] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted");
    };

    return (
        <Card className="w-full max-w-4xl mx-auto mt-8">
            <CardHeader>
                <CardTitle>Please Enter the Issue Details</CardTitle>
            </CardHeader>
            <hr />
            <CardContent className="mt-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex flex-col gap-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="picture">Picture</Label>
                            <Input
                                id="picture"
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                            />
                        </div>
                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Selected Preview"
                                className="mt-4 max-h-96"
                            />
                        )}
                    </div>
                    <div className="flex w-full gap-4 items-between">
                        <Select className="w-full">
                            <SelectTrigger >
                                <SelectValue placeholder="Subject" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="neural-networks">Neural Networks</SelectItem>
                                <SelectItem value="internet-of-things">Internet of Things</SelectItem>
                                <SelectItem value="cloud-computing">Cloud Computing</SelectItem>
                                <SelectItem value="front-end-web-development">Frontend Web Development</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select className="w-full">
                            <SelectTrigger >
                                <SelectValue placeholder="Unit Test" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="unit-test-1">Unit Test 1</SelectItem>
                                <SelectItem value="unit-test-2">Unit Test 3</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label htmlFor="description">Description</Label>
                        <Textarea id="description" />
                    </div>
                    {/* <Button type="submit" className="w-full">
                        Submit
                    </Button> */}
                </form>
            </CardContent>
        </Card>
    );
};

export default Problem;
