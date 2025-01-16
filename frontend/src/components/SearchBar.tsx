import { useState, FormEvent } from "react";
import { useSearchContext } from "../contexts/SearchContext"
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);
  
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(destination, checkIn, checkOut, adultCount, childCount);
    navigate("/search");
  };

  const handleClear = (event: FormEvent) => {
    event.preventDefault();
    // Reset all form values
    setDestination("");
    setCheckIn(new Date());
    setCheckOut(new Date());
    setAdultCount(1);
    setChildCount(0);

    // Clear the search context
    search.saveSearchValues("", new Date(), new Date(), 1, 0);

    // Navigate to home page
    navigate("/");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  return (
    <form className="-mt-8 p-3 bg-orange-400 rounded shadow-xl
      grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4">
      <div className="flex flex-row items-center flex-1 bg-white p-2">
        <MdTravelExplore size={25} className="mr-2" />
        <input 
          placeholder="Where are you going"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className="flex bg-white px-2 py-1 gap-2">
        <label className="items-center flex">
          Adults:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="items-center flex">
          Children:
          <input
            className="w-full p-1 focus:outline-none font-bold"
            type="number"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>

      <div className="flex bg-white items-center">
        <p className="font-semibold px-3">CheckIn: </p>
        <DatePicker 
          selected={checkIn}
          className="p-2 w-full"
          onChange={(date) => setCheckIn(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
      <div className="flex bg-white items-center">
        <p className="font-semibold px-3">CheckOut: </p>
        <DatePicker 
          selected={checkOut}
          onChange={(date) => setCheckOut(date as Date)}
          selectsStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={minDate}
          maxDate={maxDate}
          className="p-2 w-full"
        />
      </div>
      <div className="flex gap-1">
        <button
          onClick={handleSubmit}
          className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500"
        >
          Search
        </button>
        <button 
          onClick={handleClear}
          className="w-1/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;