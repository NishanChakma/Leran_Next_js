import styled from "@emotion/styled"; //this is node modles css
import Link from "next/link";
import styles from "./posts.module.scss"; //This is styles css modules

const CustomContainer = styled.h1({
  fontSize: "20px",
});


const Posts = ({ id, title, body }) => {
  return (
    <div >
      <CustomContainer>
        {/* <Link  href={`/apiCall/${id}`}> */}
        <Link href="/apiCall/[id]" as={"/apiCall/" + id}>
          <a>{title}</a>
        </Link>
      </CustomContainer>
      <p className={styles.body}>{body}</p>
    </div>
  );
}

export default Posts;