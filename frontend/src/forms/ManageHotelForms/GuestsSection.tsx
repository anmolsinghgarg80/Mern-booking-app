import { useFormContext } from "react-hook-form"
import { HotelFormData } from "./ManageHotelForm";

const GuestsSection = () => {
  const {register , formState: { errors }} = useFormContext<HotelFormData>();
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Guests</h2>
      <div className="grid grid-cols-2 py-6 px-3 gap-5 bg-gray-300">
        <label className="text-gray-700 text-sm font-semibold">
          Adults 
          <input type="number"
           className="border rounded w-full py-3 px-3 font-normal" 
          min={1}
          {...register("adultCount", {
            required: "This field is required",
          })} />
          {errors.adultCount?.message && (
          <span className="text-red-500 text-sm pb-1 font-bold">{errors.adultCount?.message}</span>
          )}
          
        </label>
        <label className="text-gray-700 text-sm font-semibold">
          Child
          <input type="number"
           className="border rounded w-full py-3 px-3 font-normal"
          {...register("childCount", {
            required: "This field is required",
          })} />
          {errors.childCount?.message && (
          <span className="text-red-500 text-sm pb-1 font-bold">{errors.childCount?.message}</span>
          )}
          
        </label>

      </div>
    </div>
  );
};

export default GuestsSection;