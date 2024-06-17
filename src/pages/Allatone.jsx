import Probpreview from '@/components/Probpreview';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Allatone = () => {
  const token = localStorage.getItem('token');
  let user = null;

  const [problems, setProblems] = useState([]);

  function parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  if (token) {
    user = parseJwt(token);
  }

  const getAllIssues = async () => {
    try {
      const response = user
        ? await axios({
          url: `${import.meta.env.VITE_SERVER_URL}/api/approve`,
          method: "get",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        : await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/issues`);

      console.log(response.data);
      setProblems(response.data);
    } catch (error) {
      console.error("Error fetching problems:", error);
    }
  };

  useEffect(() => {
    getAllIssues();
  }, []);

  const filterProblemsByStatus = (status) => {
    return problems.filter(problem => problem.status === status);
  };

  return (
    <>
      {problems.length > 0 ? (
        user ? (
          <Tabs defaultValue="default" className='mx-10 my-1'>
            <TabsList className="w-full flex justify-evenly h-12">
              <TabsTrigger className="h-9" value="default">Pending</TabsTrigger>
              <TabsTrigger className="h-9" value="approved">Approved</TabsTrigger>
              <TabsTrigger className="h-9" value="rejected">Rejected</TabsTrigger>
            </TabsList>
            <TabsContent value="default">
              <div className='grid grid-cols-4 gap-5 mx-12 my-8'>
                {filterProblemsByStatus("default").map((problem) => (
                  <Probpreview
                    key={problem._id}
                    problem={problem}
                    user={user}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="approved">
              <div className='grid grid-cols-4 gap-5 mx-12 my-8'>
                {filterProblemsByStatus("approved").map((problem) => (
                  <Probpreview
                    key={problem._id}
                    problem={problem}
                    user={user}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="rejected">
              <div className='grid grid-cols-4 gap-5 mx-12 my-8'>
                {filterProblemsByStatus("rejected").map((problem) => (
                  <Probpreview
                    key={problem._id}
                    problem={problem}
                    user={user}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <div className='grid grid-cols-4 gap-5 mx-12 my-8'>
            {problems.map((problem) => (
              <Probpreview
                key={problem._id}
                problem={problem}
                user={user}
                onStatusChange={handleStatusChange}
                onClose={() => setDialogOpen(false)}
              />
            ))}
          </div>
        )
      ) : (
        <h1 className='text-4xl text-center mt-20'>No Issues to Show</h1>
      )}
    </>
  );
};

export default Allatone;
