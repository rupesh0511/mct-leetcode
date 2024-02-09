import Topbar from "@/components/Topbar/Topbar";
import Workspace from "@/components/Workspace/Workspace";
import { problems } from "@/utils/problems";
import { Problem } from "@/utils/types/problem";
import React from "react";

type ProblemPageProps={
    problem:Problem
}

const ProblemPage:React.FC<ProblemPageProps>=({problem}) => {
    console.log(problem);
    return(
        <>
        <Topbar problemPage/>
        <Workspace problem={problem}/>
        </>
    )
}
export default ProblemPage;


export async function getStaticPaths() {
	const paths = Object.keys(problems).map((key) => ({
		params: { pid: key },
	}));

	return {
		paths,
		fallback: false,
	};
}


export async function getStaticProps({ params }: { params: { pid: string } }) {
	const { pid } = params;
	const problem = problems[pid];

	if (!problem) {
		return {
			notFound: true,
		};
	}
	problem.handlerFunction = problem.handlerFunction.toString();
    //stringyfy cause it comes in json 
	return {
		props: {
			problem,
		},
	};
}