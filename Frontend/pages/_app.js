
import 'bootstrap/dist/css/bootstrap.min.css';
function MyApp({ Component, pageProps }) {
  return (
    <div className="px-3" style={{ minHeight:"100vh", height:"100%", overflowX:"hidden", color:"white", background:"#1B1C24"}}>
      <Component {...pageProps} />
    </div>)
}

export default MyApp
