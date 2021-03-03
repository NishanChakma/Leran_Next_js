import dynamic from 'next/dynamic';
import Image from 'next/image';
import Posts from "../../components/posts/index";

// ------------DynamicImport will return after done server side rendering-------------
const DynamicImport = dynamic(
  () => import('../../components/Header').then((mod) => mod.PostHeader), //Header is file name and PostHeader is component name
  { 
    loading: () => <p>Loading...</p>,
    ssr: false 
  }
)

export default function Index({ posts }) {
    return (
      <>
        <DynamicImport/>
        <ul className="row">
              {posts.map((post) => {
                  return (
                      <li key={post.id} className={"col-md-3"}>
                        <Image
                          src={"/images/" + post.id + ".png"}
                          alt="No Picture"
                          width={680}
                          height={400}
                          layout="responsive"
                        />
                        <Posts {...post} />
                      </li>
                  );
              })}
        </ul>
      </>
    );
  }
  
//   ----------This will fetch data for the first time-------- 
// ----------this is not dynamic page thats why we dont need getStaticPath---------
  export async function getStaticProps() {
    // const res = await fetch("https://jsonplaceholder.typicode.com/posts"); //<---------normal method for api call
    // const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}${process.env.POST_URL}`); //<---------if we want url to public we use NEXT_PUBLIC before veriable name and also have to added NEXT_PUBLIC in .env.local also
    const res = await fetch(`${process.env.API_URL}${process.env.API_METHOD}`);
    const posts = await res.json();  
    return {
        revalidate: 10, //<---------it will call api every 10 seconds----
        props: {
            posts,
        },
    };
  }
  
//   ---------It will need if you want to call a api from server for every request--------------
  // export async function getServerSideProps() {
  //   const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  //   const posts = await res.json();  
  //   return {
  //     props: {
  //       posts,
  //     },
  //   };
  // }