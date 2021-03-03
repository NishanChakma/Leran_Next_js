import { useRouter } from "next/router";
import React from "react";

export default function Post({ postData }) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed initially until getStaticProps() finishes running 
  if (router.isFallback) {
    return <div>Loading Page Data...</div>;
  }

  return (
    <div>
      <h2>{postData.title}</h2>
      <p>{postData.body}</p>
    </div>
  );
}


// ----------- This is deprecated methode---------
// Post.getInitialProps = async ({ query }) => {
//   const { id } = query;
//   return { id };
// };


export async function getStaticPaths() {
  const paths = ["/apiCall/1", "/apiCall/2"]; //<-------- this will auto generated data while build to faster load data 
  return { paths, fallback: true }; //<------------------if fallback is true it will call api again; for the request and get the data
}

export async function getStaticProps({ query, params }) {
  const { id } = query || params; //<----------this will get index.js query||params
  // const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + id);
  const res = await fetch(`${process.env.API_URL}${process.env.API_METHOD}/${id}`); //<---this api is comming from .env file
  const postData = await res.json();
  return {
    props: {
      postData,
    },
  };
}


//getServerSideProps always call server for every request
/*
export async function getServerSideProps({ query }) {
  const { id } = query;
  const res = await fetch("https://jsonplaceholder.typicode.com/posts/" + id);
  const postData = await res.json();
  return {
    props: {
      postData,
    },
  };
}
*/