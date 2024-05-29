import Lottie from "lottie-react";
import animation from "../assets/loading-animation.json";

function Loading() {
    return(
        <div className="d-flex justify-content-center my-5">
            <span style={{width:100}}>
                <Lottie animationData={animation}/>
            </span>
        </div>
    )
}

export default Loading;