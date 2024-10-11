import axiosClient from "@/lib/axios";
import { UpdateProfile } from "@/types/users/userTypes";

const userService = {
  updateProfile: async (data: UpdateProfile) => {
    const res = await axiosClient.put("/api/users/update-profile", data);

    return res.data;
  },
  getProfile: async () => {
    const res = await axiosClient.get("/api/users/view-profile");

    return res.data;
  },
};

export default userService;
