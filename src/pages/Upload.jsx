import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useLocation } from "react-router-dom";
import Problem from "@/components/Problem";

const Upload = () => {
  const location = useLocation();
  const state = location.state || {};

  useEffect(() => {
    // console.log("in upload");
    // console.log(state);
    // When the component mounts, add one initial problem
    setProblems([
      {
        subject: "",
        unitTest: "",
        description: "",
        imageUrl: "",
        rollno: state.rollno || "not mentioned",
        section: state.section || "not mentioned",
        studentName: state.name || "not mentioned",
        status: "default",
      },
    ]);
  }, []);

  const [problems, setProblems] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const addProblem = () => {
    const newProblem = {
      subject: "",
      unitTest: "",
      description: "",
      imageUrl: "",
      rollno: state.rollno || "not mentioned",
      section: state.section || "not mentioned",
      studentName: state.name || "not mentioned",
      status: "default",
    };
    setProblems([...problems, newProblem]);
  };

  const handleChange = (index, name, value) => {
    // console.log("Index:", index);
    // console.log("Name:", name);
    // console.log("Value:", value);
    const newProblems = [...problems];
    newProblems[index] = {
      ...newProblems[index],
      [name]: value
    };
    // console.log("New Problems:", newProblems);
    setProblems(newProblems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Problems:", problems);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col mx-10 my-2 items-center">
      {problems.map((problem, index) => (
        <Problem key={index} idx={index} handleChange={handleChange} isSubmitted={submitted} />
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
          <Button variant="destructive" onClick={addProblem} className="w-full">
            Add Problem
          </Button>
          <Button onClick={handleSubmit} className="w-full">
            Submit
          </Button>
        </div>
      )}
    </div>
  );
};

export default Upload;
