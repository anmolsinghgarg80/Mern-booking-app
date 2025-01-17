import DatePicker from "react-datepicker";
import { useForm } from "react-hook-form";
import { SlCalender } from "react-icons/sl";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {
  hotelId: string,
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
}

const GuestInfoForm = ({hotelId, pricePerNight} : Props) => {

  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const {watch, register, handleSubmit, setValue, formState: {errors},
  }= useForm <GuestInfoFormData>({
    defaultValues : {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      adultCount: search.adultCount,
      childCount: search.childCount,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  // saves the default value before redirecting
  const onSignInClick = (data:GuestInfoFormData ) => {
    search.saveSearchValues("",
        data.checkIn,
        data.checkOut,
        data.adultCount,
        data.childCount,
      );
      navigate("/signin",{state: {from: location }})
  };
  const onSubmit = (data:GuestInfoFormData ) => {
    search.saveSearchValues("",
        data.checkIn,
        data.checkOut,
        data.adultCount,
        data.childCount,
      );
      navigate(`/hotel/${hotelId}/booking`);
  };

  return (
    <div className="flex flex-col p-4 bg-blue-200 gap-4 rounded-lg mt-3">
      <h3 className="text-md font-bold">${pricePerNight}</h3>
      <form onSubmit={isLoggedIn? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}>
        <div className="grid grid-cols-1 gap-4 items-center">
          <div className="flex items-center bg-white px-3 rounded-3xl ">
            <SlCalender className="text-xl mr-5" />
              <DatePicker 
                selected={checkIn}
                className="p-2 min-w-full"
                onChange={(date) => setValue("checkIn", date as Date)}
                selectsStart
                placeholderText="Check-In-Date"
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                wrapperClassName="w-3/4"
              />
          </div>
          <div className="flex items-center bg-white px-3 rounded-3xl ">
            <SlCalender className="text-xl mr-5" />
              <DatePicker 
                selected={checkOut}
                className="p-2 min-w-full"
                onChange={(date) => setValue("checkOut", date as Date)}
                selectsStart
                placeholderText="Check-Out-Date"
                startDate={checkIn}
                endDate={checkOut}
                minDate={minDate}
                maxDate={maxDate}
                wrapperClassName="w-3/4"
              />
          </div>

          <div className="flex bg-white rounded-3xl justify-around px-4 py-1 gap-2">
            <label className="items-center flex">
              Adults:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={1}
                max={20}
                {...register("adultCount",{
                  required: "This field is required",
                  min: {
                    value: 1,
                    message: "There must be at least one adult",
                  },
                })}
              />
            </label>
            <label className="items-center flex">
              Children:
              <input
                className="w-full p-1 focus:outline-none font-bold"
                type="number"
                min={0}
                max={20}
                {...register("childCount",{
                  required: "This field is required",
                  valueAsNumber: true,
                })}
              />
            </label>
            {errors.adultCount && (
              <span className="text-red-500 font-semibold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>

          { isLoggedIn ? (
            <button className="bg-blue-600 rounded-3xl text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
              Book Now
            </button>
            ) : (
            <button className="bg-blue-600 rounded-3xl text-white h-full p-2 font-bold hover:bg-blue-500 text-xl">
              Sign in to Book
            </button>
          ) }
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm