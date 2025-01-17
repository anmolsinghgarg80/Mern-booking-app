import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";
import { useState } from "react";
import SearchResultCard from '../components/SearchResultCard'
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import FacilitiesFilter from "../components/Facilities";
import PriceFilter from "../components/PriceFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]);
  const [selectedFacilites, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number>();
  const [sortOption, setSortOption] = useState<string>("")

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page:page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilites: selectedFacilites,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };
  

  const {data: hotelData} = useQuery(["serachHotels", searchParams], () => 
    apiClient.searchHotels(searchParams)
  );

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    setSelectedStars((prevStars) => 
      event.target.checked
      ? [...prevStars, starRating]
      : prevStars.filter((star) => star!== starRating)
    );
  };

  const handleHotelTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hoteltype = event.target.value;

    setSelectedHotelTypes((prevtypes) => 
      event.target.checked
      ? [...prevtypes, hoteltype]
      : prevtypes.filter((prevtype) => prevtype!== hoteltype)
    );
  };

  const handleFacilitesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;

    setSelectedFacilities((prevfacility) => 
      event.target.checked
      ? [...prevfacility, facility]
      : prevfacility.filter((prevfac) => prevfac!== facility)
    );
  };


  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      {/* Left sidebar - unchanged */}
      <div className="rounded-lg border shadow-sm border-slate-200 p-5 h-fit lg:sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter 
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          /> 
          <HotelTypesFilter
            selectedHotelTypes={selectedHotelTypes}
            onChange={handleHotelTypeChange}
          />
          <FacilitiesFilter
            selectedFacilities={selectedFacilites}
            onChange={handleFacilitesChange}
          />
          <PriceFilter
            selectedPrice={selectedPrice}
            onChange={(value?: number) => setSelectedPrice(value)}
          />
        </div>
      </div>

      {/* Right content area - modified with flex layout */}
      <div className="flex flex-col min-h-[calc(100vh-2rem)] ">
        {/* Header section */}
        <div className="flex justify-between items-center mb-5">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total !== 1 
              ? `${hotelData?.pagination.total || ""} Hotels found` 
              : `${hotelData?.pagination.total || ""} Hotel found`}  
            {search.destination? ` in ${search.destination}` : ""}
          </span>

          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sort By</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">Price Per Night (low to high)</option>
            <option value="pricePerNightDesc">Price Per Night (high to low)</option>
          </select>
        </div>

        {/* Main content area */}
        <div className="flex flex-col flex-grow gap-5">
          {hotelData?.data.map((hotel) => (
            <SearchResultCard key={hotel._id} hotel={hotel} />
          ))}
        </div>

        {/* Pagination section - now will stick to bottom */}
        <div className="mt-auto pt-4 border-t">
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1} 
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};
export default Search;