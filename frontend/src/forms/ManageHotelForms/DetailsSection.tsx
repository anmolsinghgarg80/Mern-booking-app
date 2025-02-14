import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const { register, formState:{ errors }} = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input 
            type="text"
            className='input-box'
            {...register("name",{required:"This field is required"})}
          />
          {errors.name && (<p className='text-red-600 text-xs pb-1 font-bold'>{errors.name?.message}</p>) }
      </label>
      <div className="flex gap-4" >
      <label className="text-gray-700 text-sm font-bold flex-1">
        City
        <input 
            type="text"
            className='input-box'
            {...register("city",{required:"This field is required"})}
          />
          {errors.city && (<p className='text-red-600 text-xs pb-1 font-bold'>{errors.city?.message}</p>) }
      </label>
      <label className="text-gray-700 text-sm font-bold flex-1">
        Country
        <input 
            type="text"
            className='input-box'
            {...register("country",{required:"This field is required"})}
          />
          {errors.country && (<p className='text-red-600 text-xs pb-1 font-bold'>{errors.country?.message}</p>) }
      </label>
      </div> 

        <label className="text-gray-700 text-sm font-bold flex-1">
          Description
          <textarea
              rows={10}
              className='input-box'
              {...register("description",{required:"This field is required"})}
            />
            {errors.description && (<p className='text-red-600 text-xs pb-1 font-bold'>{errors.description?.message}</p>) }
        </label>
        <label className="text-gray-700 text-sm font-bold max-w-[50%]">
          Price Per Night
          <input
              type="number"
              className='input-box'
              {...register("pricePerNight",{required:"This field is required"})}
            />
            {errors.pricePerNight && (<p className='text-red-600 text-xs pb-1 font-bold'>{errors.pricePerNight?.message}</p>) }
        </label>
        <label className="text-gray-700 text-sm font-bold max-w-[50%]">
          Star Rating
          <select {...register("starRating",{
            required:"This field is required",
          })}
            className="border rounded w-full py-2 text-gray-700 font-normal"
          >
            <option value="" className="text-sm font-bold">
              Select as Rating
            </option>
            {[1,2,3,4,5].map((num) => (
              <option value={num}>{num}</option>
            ))}
          </select>
            {errors.starRating && (<p className='text-red-600 text-xs pb-1 font-bold'>{errors.starRating?.message}</p>) }
        </label>
  


    </div>
  );
};

export default DetailsSection;