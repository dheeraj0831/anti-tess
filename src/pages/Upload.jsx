import Problem from "@/components/Problem"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
const Upload = () => {

  useEffect(() => {
    // When the component mounts, add one initial problem
    addProblem();
  }, []);


  const [problems, setProblems] = useState([])

  const addProblem = (problem) => {
    setProblems([...problems, problem])
  }

  const handleSubmit = () => {
    console.log(problems)
    setProblems([])
  }
  return (
    <div className="flex flex-col mx-10 my-2 ">
      {problems.map((problem, index) => (
        <Problem key={index} problem={problem} />
      ))
      }

      <div className="w-full max-w-4xl mx-auto flex items-between gap-5 mt-5 mb-10">
        <Button variant="destructive" onClick={addProblem} className='w-full'>Add Problem</Button>
        <Button onClick={handleSubmit} className='w-full'>Submit</Button>
      </div>
    </div>

  )
}

export default Upload