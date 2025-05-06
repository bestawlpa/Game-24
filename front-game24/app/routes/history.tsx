import { useGetJwtUser } from "../utils/getJwtUser"

export default function History() {
    useGetJwtUser("/login", "unauthenticated");

    return (
        <div>
            histiry
        </div>
    )
};