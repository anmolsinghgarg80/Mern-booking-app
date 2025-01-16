import { HotelType } from "../../../backend/shared/types"
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
type Props = {
  hotel: HotelType;
};

const SearchResultCard = ({hotel} : Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-3 border rounded-md shadow-sm border-slate-200 p-1">
      <div className="w-full h-[300px]"> {/* container determining the size of image */}
        <img src={hotel.imageUrls[0]} 
          className="w-full h-full object-cover object-center rounded-md" 
        />
      </div>
      <div className="grid grid-rows-[2fr_4fr_3fr] px-2 gap-3">
        <div>
          <div className="flex items-center">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map(() =>(
                <AiFillStar className="fill-yellow-400" />
              )) }
            </ span> 
            <span className="ml-1 text-sm font-semibold">{hotel.type}</span>
          </div>
          <Link to={`/detail/${hotel._id}`} className="text-2xl font-bold cursor-pointer">
            {hotel.name}
          </Link>
        </div>

        <div>
          <div className="line-clamp-4">{hotel.description}</div>
        </div>

        <div className="grid grid-cols-2 items-end pb-2 whitespace-nowrap">
            <div className="flex gap-1 items-center">
                {hotel.facilities.slice(0,3).map((facility) => (
                    <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                      {facility}
                    </span>
                ))}
                <span className="text-base">
                  {hotel.facilities.length > 3 &&
                   `+ ${hotel.facilities.length - 3} more`}
                </span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="font-bold">${hotel.pricePerNight} per night </span>
              <Link to={`/detail/${hotel._id}`} className="bg-blue-600 text-white h-full p-2 font-bold text-xl max-w-fit rounded hover:bg-blue-500 ">View More</Link>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;