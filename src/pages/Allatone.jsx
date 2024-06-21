import Probpreview from '@/components/Probpreview';
import { ProbpreviewSkeleton } from '@/components/Probpreview';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Allatone = () => {
  const token = localStorage.getItem('token');
  let user = null;

  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unitTestFilter, setUnitTestFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [sectionFilter, setSectionFilter] = useState('');

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

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

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
      setProblems(shuffleArray(response.data));
    } catch (error) {
      console.error("Error fetching problems:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllIssues();
  }, []);

  const filterProblemsByStatus = (status) => {
    return problems.filter(problem => problem.status === status);
  };

  const filterProblems = () => {
    return problems.filter(problem => {
      return (
        (unitTestFilter ? problem.unitTest === unitTestFilter : true) &&
        (subjectFilter ? problem.subject === subjectFilter : true) &&
        (sectionFilter ? problem.section === sectionFilter : true)
      );
    });
  };

  const uniqueValues = (key) => {
    return [...new Set(problems.map(problem => problem[key]))];
  };

  return (
    <>
      {loading ? (
        user ? (
          <>
            <Skeleton className='mx-12 h-12' />
            <Skeleton className='mx-20 mt-4 px-5 h-4 w-[19%]' />
            <div className='mx-16 mt-10 grid grid-cols-4 max-sm:grid-cols-1 gap-5'>
              {Array(8).fill(0).map((_, index) => (
                <ProbpreviewSkeleton key={index} />
              ))}
            </div>
          </>
        ) : (
          <>
            <Skeleton className='mx-12 mt-4 h-4 w-[19%]' />
            <div className='mx-12 mt-16 grid grid-cols-4 max-sm:grid-cols-1 gap-5'>
              {Array(8).fill(0).map((_, index) => (
                <ProbpreviewSkeleton key={index} />
              ))}
            </div>
          </>
        )
      ) : problems.length > 0 ? (
        <>
          {user ? (
            <Tabs defaultValue="default" className='mx-10 my-1'>
              <TabsList className="w-full flex justify-evenly h-12">
                <TabsTrigger className="h-9" value="default">Pending</TabsTrigger>
                <TabsTrigger className="h-9" value="approved">Approved</TabsTrigger>
                <TabsTrigger className="h-9" value="rejected">Rejected</TabsTrigger>
              </TabsList>
              <TabsContent value="default">
                {(() => {
                  const pendingProblems = filterProblemsByStatus("default");
                  const filteredProblems = pendingProblems.filter(problem => filterProblems().includes(problem));
                  return (
                    <>
                      <p className='text-lg mx-12 my-3'>Number of Issues Pending: {filteredProblems.length}</p>
                      <div className="mx-12 my-4">
                        <label className="mx-2">Unit Test:</label>
                        <select onChange={(e) => setUnitTestFilter(e.target.value)} value={unitTestFilter}>
                          <option value="">All</option>
                          {uniqueValues('unitTest').map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                          ))}
                        </select>

                        <label className="mx-2">Subject:</label>
                        <select onChange={(e) => setSubjectFilter(e.target.value)} value={subjectFilter}>
                          <option value="">All</option>
                          {uniqueValues('subject').map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                          ))}
                        </select>

                        <label className="mx-2">Section:</label>
                        <select onChange={(e) => setSectionFilter(e.target.value)} value={sectionFilter}>
                          <option value="">All</option>
                          {uniqueValues('section').map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                          ))}
                        </select>
                      </div>
                      <div className='grid grid-cols-4 max-sm:grid-cols-1 gap-5 mx-12 my-8'>
                        {filteredProblems.map((problem) => (
                          <Probpreview
                            key={problem._id}
                            problem={problem}
                            user={user}
                          />
                        ))}
                      </div>
                    </>
                  );
                })()}
              </TabsContent>
              <TabsContent value="approved">
                {(() => {
                  const approvedProblems = filterProblemsByStatus("approved");
                  const filteredProblems = approvedProblems.filter(problem => filterProblems().includes(problem));
                  return (
                    <>
                      <p className='text-lg mx-12 my-3'>Number of Issues Approved: {filteredProblems.length}</p>
                      <div className="mx-12 my-4">
                        <label className="mx-2">Unit Test:</label>
                        <select onChange={(e) => setUnitTestFilter(e.target.value)} value={unitTestFilter}>
                          <option value="">All</option>
                          {uniqueValues('unitTest').map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                          ))}
                        </select>

                        <label className="mx-2">Subject:</label>
                        <select onChange={(e) => setSubjectFilter(e.target.value)} value={subjectFilter}>
                          <option value="">All</option>
                          {uniqueValues('subject').map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                          ))}
                        </select>

                        <label className="mx-2">Section:</label>
                        <select onChange={(e) => setSectionFilter(e.target.value)} value={sectionFilter}>
                          <option value="">All</option>
                          {uniqueValues('section').map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                          ))}
                        </select>
                      </div>
                      <div className='grid grid-cols-4 max-sm:grid-cols-1 gap-5 mx-12 my-8'>
                        {filteredProblems.map((problem) => (
                          <Probpreview
                            key={problem._id}
                            problem={problem}
                            user={user}
                          />
                        ))}
                      </div>
                    </>
                  );
                })()}
              </TabsContent>
              <TabsContent value="rejected">
                {(() => {
                  const rejectedProblems = filterProblemsByStatus("rejected");
                  const filteredProblems = rejectedProblems.filter(problem => filterProblems().includes(problem));
                  return (
                    <>
                      <p className='text-lg mx-12 my-3'>Number of Issues Rejected: {filteredProblems.length}</p>
                      <div className="mx-12 my-4">
                        <label className="mx-2">Unit Test:</label>
                        <select onChange={(e) => setUnitTestFilter(e.target.value)} value={unitTestFilter}>
                          <option value="">All</option>
                          {uniqueValues('unitTest').map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                          ))}
                        </select>

                        <label className="mx-2">Subject:</label>
                        <select onChange={(e) => setSubjectFilter(e.target.value)} value={subjectFilter}>
                          <option value="">All</option>
                          {uniqueValues('subject').map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                          ))}
                        </select>

                        <label className="mx-2">Section:</label>
                        <select onChange={(e) => setSectionFilter(e.target.value)} value={sectionFilter}>
                          <option value="">All</option>
                          {uniqueValues('section').map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                          ))}
                        </select>
                      </div>
                      <div className='grid grid-cols-4 max-sm:grid-cols-1 gap-5 mx-12 my-8'>
                        {filteredProblems.map((problem) => (
                          <Probpreview
                            key={problem._id}
                            problem={problem}
                            user={user}
                          />
                        ))}
                      </div>
                    </>
                  );
                })()}
              </TabsContent>
            </Tabs>
          ) : (
            <>
              <p className='text-lg mx-12 my-3'>Number of Issues raised: {filterProblems().length}</p>
              {/* <div className="mx-12 my-4">
                <label className="mx-2">Unit Test:</label>
                <select onChange={(e) => setUnitTestFilter(e.target.value)} value={unitTestFilter}>
                  <option value="">All</option>
                  {uniqueValues('unitTest').map((value, index) => (
                    <option key={index} value={value}>{value}</option>
                  ))}
                </select>

                <label className="mx-2">Subject:</label>
                <select onChange={(e) => setSubjectFilter(e.target.value)} value={subjectFilter}>
                  <option value="">All</option>
                  {uniqueValues('subject').map((value, index) => (
                    <option key={index} value={value}>{value}</option>
                  ))}
                </select>

                <label className="mx-2">Section:</label>
                <select onChange={(e) => setSectionFilter(e.target.value)} value={sectionFilter}>
                  <option value="">All</option>
                  {uniqueValues('section').map((value, index) => (
                    <option key={index} value={value}>{value}</option>
                  ))}
                </select>
              </div> */}
              <div className='grid grid-cols-4 max-sm:grid-cols-1 gap-5 mx-12 my-8'>
                {filterProblems().map((problem) => (
                  <Probpreview
                    key={problem._id}
                    problem={problem}
                    user={user}
                  />
                ))}
              </div>
            </>
          )}
        </>
      ) : (
        <h1 className='text-4xl text-center mt-20'>No Issues to Show</h1>
      )}
    </>
  );
};

export default Allatone;
