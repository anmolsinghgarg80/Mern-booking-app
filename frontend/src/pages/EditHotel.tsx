import { useQuery, useMutation } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from '../api-client';
import { useAppContext } from "../contexts/AppContext";
import ManageHotelForm from "../forms/ManageHotelForms/ManageHotelForm";

const EditHotel = () => {
  const { hotelId } = useParams();
  const {showToast} = useAppContext();

  const {data: hotel} = useQuery("fetchMyHotelById", () => 
    apiClient.fetchMyHotelById(hotelId || ''), {
      enabled: !!hotelId,
    }
  );

  const {mutate, isLoading} = useMutation(apiClient.updateMyHotelById,{

    onSuccess: () => {
      showToast({message: "Hotel Updated!", type: "SUCCESS"});
    },
    onError: ()=> {
      showToast({message: "Error Hotel Updating!", type: "ERROR"});
    }
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  }

  return <ManageHotelForm onSave={handleSave} isLoading={isLoading} hotel={hotel}/>
};

export default EditHotel;