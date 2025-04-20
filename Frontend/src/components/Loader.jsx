import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
  return (
  
  <div className="h-screen w-full flex justify-center items-center flex-col">
        <ClipLoader color="#36d7b7" size={50} />
        <p>Downloading...</p>
    </div>);
};
export default Loader
