import { useLocation } from "react-router-dom"

const Success = ( {data}) => {
    const location = useLocation()
    console.log(location);
    return (
        <div>
            Success
        </div>
    )
}

export default Success
