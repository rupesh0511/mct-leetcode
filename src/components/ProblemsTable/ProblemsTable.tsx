import React, { useEffect, useState } from "react";
import { problems } from "@/mockProblems/problems";
import { BsCheckCircle } from "react-icons/bs";
import Link from "next/link";
import { AiFillYoutube } from "react-icons/ai";
import { collection, doc, getDocs, orderBy, query } from "firebase/firestore";
import { firestore } from "@/firebase/firebase";

type ProblemsTableProps = {
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>;
};

const ProblemsTable: React.FC<ProblemsTableProps> = ({
  setLoadingProblems,
}) => {
  const problems = useGetProblems(setLoadingProblems);
  return (
    <>
      <tbody className="text-white">
        {problems.map((doc, idx) => {
          const difficulyColor =
            doc.difficulty === "Easy"
              ? "text-dark-green-s"
              : doc.difficulty === "Medium"
              ? "text-dark-yellow"
              : "text-dark-pink";
          return (
            <tr
              className={`${idx % 2 == 1 ? "bg-dark-layer-1" : ""}`}
              key={doc.id}
            >
              <th className="px-2 py-4 font-medium whitespace-nowrap text-dark-green-s">
                <BsCheckCircle fontSize={"18"} width="18" />
              </th>
              <td className="px-6 py-4">
                <Link
                  className="hover:text-blue-600 cursor-pointer"
                  href={`problems/${doc.id}`}
                  target="_blank"
                >
                  {doc.title}
                </Link>
              </td>
              <td className={`px-6 py-4 ${difficulyColor}`}>
                {doc.difficulty}
              </td>
              <td className={"px-6 py-4"}>{doc.category}</td>
              <td className={"px-6 py-4"}>
                {doc.videoId ? (
                  <AiFillYoutube
                    fontSize={"22"}
                    className="cursor-pointer hover:text-red-500"
                  />
                ) : (
                  <p className="text-gray-400">Coming soon</p>
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
};
export default ProblemsTable;

function useGetProblems(
  setLoadingProblems: React.Dispatch<React.SetStateAction<boolean>>
) {
  const [problems, setProblems] = useState([]);

  const problemscollectionref = collection(firestore, "rupesh");
  console.log(problemscollectionref);

  const getProblems = async () => {
      
    //   setLoadingProblems(true);
    //   const q = query(
    //     collection(firestore, "problems"),
    //     orderBy("order", "asc")
    //   );
    //   const querySnapshot = await getDocs(q);
	try{
		const data = await getDocs(problemscollectionref);
	
	    console.log(data);
	}
	catch(error){
		console.log(error);
	}
     
    };

  useEffect(() => {
  
    getProblems();
  }, []);
  return problems;
}
