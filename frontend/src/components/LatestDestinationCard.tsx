import { HotelType } from "../../../backend/shared/types";
import { Link } from "react-router-dom";

type Props = {
  hotel: HotelType;
};

const LatestDestinationCard = ({ hotel }: Props) => {
  return (
    <Link
      to={`/detail/${hotel._id}`}
      className="relative cursor-pointer overflow-hidden rounded-lg shadow-lg transition-transform transform hover:scale-105"
    >
      <div className="h-[300px] md:h-[400px]">
        <img
          src={hotel.imageUrls[0]}
          alt={hotel.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute bottom-0 p-6 bg-gradient-to-t from-black via-transparent to-transparent text-white">
        <h3 className="text-2xl font-bold truncate">{hotel.name}</h3>
      </div>
    </Link>
  );
};

export default LatestDestinationCard;