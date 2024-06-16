import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useLocation } from "react-router-dom";
import Problem from "@/components/Problem";
import axios from "axios";

const Upload = () => {
  const location = useLocation();
  const st = location.state || {};
  const state = useRef(st);

  useEffect(() => {
    // When the component mounts, add one initial problem
    setProblems([
      {
        subject: "",
        unitTest: "",
        description: "",
        imageUrl: "",
        imageFile: null,
        rollno: state.current.rollno || "not mentioned",
        section: state.current.section || "not mentioned",
        studentName: state.current.studentName || "not mentioned",
        status: "default",
      },
    ]);
  }, []);

  const [problems, setProblems] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // State to track whether form is currently submitting or not

  const isCurrentProblemComplete = () => {
    const currentProblem = problems[problems.length - 1];
    return (
      problems.length === 0 ||
      (currentProblem.subject &&
        currentProblem.unitTest &&
        currentProblem.description &&
        currentProblem.imageFile)
    );
  };

  const addProblem = () => {
    const newProblem = {
      subject: "",
      unitTest: "",
      description: "",
      imageUrl: "",
      imageFile: null,
      rollno: state.current.rollno || "not mentioned",
      section: state.current.section || "not mentioned",
      studentName: state.current.studentName || "not mentioned",
      status: "default",
    };
    setProblems([...problems, newProblem]);
  };

  const handleChange = (index, name, value) => {
    const newProblems = [...problems];
    newProblems[index] = {
      ...newProblems[index],
      [name]: value,
    };
    setProblems(newProblems);
  };

  const addToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", import.meta.env.VITE_CLOUD_PRESET); // Replace with your Cloudinary upload preset

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME
        }/image/upload`,
        formData
      );
      return response.data.secure_url; // This is the URL of the uploaded image
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Set isSubmitting to true when form submission starts
    setIsSubmitting(true);

    const updatedProblems = await Promise.all(
      problems.map(async (problem) => {
        if (problem.imageFile) {
          const imageUrl = await addToCloudinary(problem.imageFile);
          return { ...problem, imageUrl };
        }
        return problem;
      })
    );

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/problems`,
        updatedProblems
      );
      console.log("Server Response:", response.data);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting problems:", error);
    } finally {
      // Reset isSubmitting to false when form submission completes
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col mx-10 my-2 items-center">
      {problems.map((problem, index) => (
        <Problem
          key={index}
          idx={index}
          handleChange={handleChange}
          isSubmitted={submitted}
        />
      ))}
      {submitted ? (
        <Alert className="mx-10 mt-5 w-full max-w-4xl">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Thank You!</AlertTitle>
          <AlertDescription>
            This will be submitted to the Academic Director as a proof
          </AlertDescription>
        </Alert>
      ) : (
        <div className="w-full max-w-4xl mx-auto flex items-between gap-5 mt-5 mb-10">
          <Button
            variant="destructive"
            disabled={!isCurrentProblemComplete()}
            onClick={addProblem}
            className="w-full"
          >
            Add Problem
          </Button>
          <Button
            disabled={!isCurrentProblemComplete() || isSubmitting} // Disable button when submitting
            onClick={handleSubmit}
            className="w-full"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Upload;
