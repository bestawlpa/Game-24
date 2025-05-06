import { useState } from 'react';
import { Link } from 'react-router';

export default function Game() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [calculate, setCalculate] = useState<string>("");
  const [openCheat, setOpenCheat] = useState(false);
  const [cheat, setCheat] = useState<string>("");
  const isStarted = numbers.length > 0;

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
  };

  const handleClickSubmit = () => {
    console.log(calculate);
  };

  const handleCheatSubmit = () => {
    console.log('Cheat submit:', cheat);
  };

  return (
    <div className=" w-screen h-screen flex justify-center items-center bg-[#F2D2F4]">
      <div className=' flex items-center w-[800px] justify-between'>
        <div className={`w-[500px] h-[500px] flex flex-col items-center  ${isStarted ? " justify-between" : "justify-center"}`}>
          <div className=' grid grid-cols-2 gap-18 mx-auto'>
            {numbers.map((num, index) => (
              <div
                key={index}
                onClick={() => handleClick(num)}
                className=' w-[150px] h-[150px] text-5xl font-extrabold bg-white flex justify-center items-center text-black rounded-3xl'
              >
                {num}
              </div>
            ))}
          </div>

          <button onClick={fetchNumber} className={`text-3xl px-12 py-2.5 font-semibold rounded-2xl ${isStarted ? "bg-blue-700" : "bg-red-700"}`}>
            {isStarted ? "Reset" : "Start"}
          </button>
        </div>
        <div className=" w-[300px] min-h-[200px] bg-amber-50 rounded-2xl flex flex-col justify-around items-center ">
          {openCheat ? (
            <>
              <input
                type="text"
                className="w-[200px] h-[40px] bg-blue-400 rounded-md text-center "
                value={cheat}
                onChange={(e) => setCheat(e.target.value)}
              />
              <button onClick={handleCheatSubmit} className=" w-[200px] py-2 bg-red-600 rounded-md">
                Cheat Submit
              </button>
            </>
          ) : (
            <>
              <input type="text"
                className=' w-[200px] h-[40px] bg-blue-400 rounded-md text-center'
                value={calculate}
                onChange={(e) => setCalculate(e.target.value)} />
              <button onClick={handleClickSubmit} className=' w-[200px] py-2 bg-green-600 rounded-md'>Submit</button>
            </>
          )}
          <Link to={'/history'} className=' fixed top-10 right-10 text-3xl font-black text-emerald-700'>History</Link>
          <button onClick={() => setOpenCheat(!openCheat)} className=' fixed bottom-10 right-10 text-3xl font-black text-red-700'>Cheat</button>
        </div>
      </div>
    </div >
  )
}