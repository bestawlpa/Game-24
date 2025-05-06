import { useEffect, useState } from "react";
import { useGetJwtUser } from "../utils/getJwtUser"
import type { History } from "../interfaces/history.interface";

export default function History() {
    const userData = useGetJwtUser("/login", "unauthenticated");
    const [dataHistory, setDataHistory] = useState<History | null>(null)

    const fetchHistory = async () => {
        try {
            const response = await fetch(`http://localhost:3088/api/history/${userData?._id}`, {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            } else {
                setDataHistory(data)
            }
        } catch (error) {
            const err = error as Error;
            console.log(err);
        }
    };

    useEffect(() => {
        if (userData?._id) {
            fetchHistory();
        }
    }, [userData]);

    return (
        <div className=" w-screen h-screen flex justify-center items-center bg-[#F2D2F4]">
            <div className=' flex flex-col items-center w-[400px] h-[500px] bg-amber-50 rounded-2xl'>
                <h1 className=" my-6 text-red-600 font-bold text-4xl">HISTORY</h1>
                <div className="  mb-4  w-[370px] overflow-auto">
                    {dataHistory && dataHistory.records.length > 0 && (
                        <div key={dataHistory._id} className=" px-6">
                            {dataHistory.records.map((record) => (
                                <div key={record._id} className=" my-5 bg-green-700 rounded-md w-full h-[70px] flex flex-col justify-center items-center">
                                    <div className=" py-2 h-full flex flex-col justify-between">
                                        <h1>ตัวเลข: <span className=" font-medium">{JSON.stringify(record.numbers)}</span></h1>
                                        <h1>คำตอบ: <span className=" font-medium">[{record.calculate}]</span></h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div >
    )
};