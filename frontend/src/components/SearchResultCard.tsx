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
     
      {/* Content container */}
      <div className="flex flex-col flex-grow gap-4 p-1">
        {/* Header section */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((_, index) => (
                <AiFillStar key={index} className="fill-yellow-400" />
              ))}
            </span>
            <span className="text-sm font-semibold">{hotel.type}</span>
          </div>
          <Link 
            to={`/detail/${hotel._id}`} 
            className="text-2xl font-bold hover:text-blue-600 transition-colors"
          >
            {hotel.name}
          </Link>
        </div>

        {/* Description */}
        <div className="flex-grow">
          <p className="line-clamp-4 text-slate-500">{hotel.description}</p>
        </div>

        {/* Footer section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-auto">
          {/* Facilities */}
          <div className="flex flex-wrap gap-2 items-center">
            {hotel.facilities.slice(0, 3).map((facility, index) => (
              <span 
                key={index}
                className="bg-slate-100 px-3 py-1 rounded-full text-sm whitespace-nowrap"
              >
                {facility}
              </span>
            ))}
            {hotel.facilities.length > 3 && (
              <span className="text-sm text-slate-600">
                +{hotel.facilities.length - 3} more
              </span>
            )}
          </div>

          {/* Price and CTA */}
          <div className="flex flex-col sm:items-end gap-2 w-full sm:w-auto">
            <span className="font-bold text-lg">${hotel.pricePerNight} per night</span>
            <Link 
              to={`/detail/${hotel._id}`} 
              className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-blue-500 transition-colors w-full sm:w-auto text-center"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultCard;