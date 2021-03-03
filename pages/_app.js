import 'bootstrap/dist/css/bootstrap.min.css'; // npm i react-bootstrap bootstrap
import '../styles/global.scss'; //<---------this is global css.  we can access this page from every component
export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />
}