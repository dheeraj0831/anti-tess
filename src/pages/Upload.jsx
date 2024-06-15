import Problem from "@/components/Problem";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useLocation } from "react-router-dom";



const Upload = () => {
  const location = useLocation();
  const state = location.state;
  console.log("in upload")
  console.log(state);
  useEffect(() => {
    // When the component mounts, add one initial problem
    
    addProblem();
  }, []);

  const [problems, setProblems] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const addProblem = (problem) => {
    setProblems([...problems, problem]);
  };

  const handleSubmit = () => {
    console.log(problems);
    setProblems([]);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col mx-10 my-2 items-center">
      {problems.map((problem, index) => (
        <Problem key={index} problem={problem} />
      ))}

      {submitted ? (
        <div className="fixed top-0 left-0 h-full w-full flex justify-center items-center ">
          <Alert className="mx-10">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Thank You!</AlertTitle>
            <AlertDescription>
              This will be submitted to the Academic Director as a proof
            </AlertDescription>
          </Alert>
        </div>
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
