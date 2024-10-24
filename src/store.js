import { create } from "zustand";
import axios from "axios";

const useMemberStore = create((set) => ({
  id: "",
  nickname: "",
  profile_image: "",

  setMemberNickname: (nickname) => set({ nickname }),
  setMemberProfileImage: (profile_image) => set({ profile_image }),

  getMember: (accessToken) => {
    if (!accessToken) return;

    axios
      .get("http://localhost:8080/api/member", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        set({
          id: response.data.id,
          nickname: response.data.nickname,
          profile_image: response.data.profile_image,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  },
}));

export default useMemberStore;
