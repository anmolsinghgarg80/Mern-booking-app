import {Link} from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./SignOutButton";

const Header = () => {

  const {isLoggedIn} = useAppContext();

  return (
    <div className="bg-blue-800 py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">MernHolidays.com</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? <>
            <Link to="/my-bookings"  className="flex items-center rounded px-3 font-bold hover:text-blue-400 text-white" >My Bookings</Link>
            <Link to="/my-hotels"  className="flex items-center rounded px-3 font-bold hover:text-blue-400 text-white">My Hotels</Link>
            <SignOutButton />
          </>
          :<Link to="/signin" className="flex items-center rounded px-3 font-bold bg-gray-100 text-blue-800 hover:bg-blue-500 hover:text-white">Sign In</Link>
          
          }
        </span>
      </div>
    </div>
  );
};

export default Header;