import { useQuery } from 'react-query';
import * as apiClient from '../api-client';

const Home = () => {
  const { data: hotels } = useQuery("fetchQuery", apiClient.fetchHotels);

  const featuredHotel = hotels?.[0];
  const popularHotels = hotels?.slice(2) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-600">
            Latest Destinations
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
            Discover extraordinary places to stay, carefully curated by our hosts
          </p>
        </header>

        {/* Featured Destination */}
        {featuredHotel && (
          <section className="mb-16">
            <DestinationCard hotel={featuredHotel} featured={true} />
          </section>
        )}

        {/* Popular Destinations */}
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-8">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularHotels.map((hotel) => (
              <DestinationCard key={hotel._id} hotel={hotel} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

interface Hotel {
  _id: string;
  name: string;
  imageUrls: string[];
}

const DestinationCard = ({ hotel, featured = false }: { hotel: Hotel; featured?: boolean }) => {
  return (
    <a 
      href={`/detail/${hotel._id}`}
      className={`block group relative overflow-hidden rounded-xl ${
        featured ? 'h-[500px]' : 'h-[400px]'
      }`}
    >
      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
      
      <img
        src={hotel.imageUrls[0]}
        alt={hotel.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <div className="absolute inset-0 flex flex-col justify-end px-6 pb-3">
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-6">
          <h3 className="text-2xl font-bold text-white mb-2">{hotel.name}</h3>
          <div className="h-1 w-12 bg-blue-500 rounded" />
        </div>
      </div>
    </a>
  );
};

export default Home;