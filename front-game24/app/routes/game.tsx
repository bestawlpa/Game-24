import { useState } from 'react';

export default function Game() {
    const [numbers, setNumbers] = useState<number[]>([]);

    const fetchNumber = async () => {
        try {
            const response = await fetch('http://localhost:3088/api/generate-numbers');
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message);
            }
            const data = await response.json();

            const spt = data.number.toString().split('').map(Number);
            console.log('data', spt);
            setNumbers(spt);
        } catch (error) {
            const err = error as Error;
            console.log(err);
        }
    }

    const handleClick = (n: Number) => {
        console.log(n);
    }

    return (
        <div>
            {numbers.map((num, index) => (
                <button key={index} onClick={() => handleClick(num)}>
                    {num}
                </button>
            ))}
            <button onClick={fetchNumber}>start</button>
        </div>
    )
}