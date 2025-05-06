import { useGetJwtUser } from "../utils/getJwtUser"

export default function History() {
    const userData = useGetJwtUser("/login", "unauthenticated");
    console.log(userData);


    return (
        <div>
            histiry
        </div>
    )
};