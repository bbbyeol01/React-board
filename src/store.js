import { create } from "zustand";
import axios from "axios";

const useMemberStore = create((set) => ({
  // id: "",
  // nickname: "",
  // profile_image: "",

  // setMemberNickname: (nickname) => set({ nickname }),
  // setMemberProfileImage: (profile_image) => set({ profile_image }),

  getId: async (accessToken) => {
    if (!accessToken) return;

    const responseId = await axios.get("http://localhost:8080/api/member", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const id = responseId.data.id;
    return id;
  },

  getMemberInfo: async (accessToken) => {
    if (!accessToken) return;

    const responseId = await axios.get("http://localhost:8080/api/member", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const id = responseId.data.id;

    const responseMemberInfo = await axios.get(
      "http://localhost:8080/api/memberInfo",
      { params: { id } }
    );

    const nickname = responseMemberInfo.data.nickname;
    const profile_image = responseMemberInfo.data.profile_image;

    return { nickname, profile_image };
  },
}));

export default useMemberStore;
