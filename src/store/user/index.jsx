import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { setToken, cache } from "@/utils/index";
import { login, getInfoApi } from "@/api/login";
const user = createSlice({
  name: "user",
  initialState: {
    token: cache.session.get("token") || "",
    userInfo: JSON.parse(cache.session.get("userInfo")) || {},
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
      cache.session.set("userInfo", JSON.stringify(action.payload));
    },
    // 退出登录
    goOutLogin(state) {
      state.token = null;
      state.userInfo = {};
      cache.session.remove("token");
      cache.session.remove("userInfo");
      //   window.location.reload();
    },
  },
  // 配合createAsyncThunk验证登录信息
  extraReducers(builder) {
    builder
      .addCase(logIn.pending, () => { })
      .addCase(logIn.fulfilled, (state, { payload }) => {
        if (payload.code == 200) {
          setToken(payload.data.token);
          cache.session.set("token", payload.data.token);
          state.token = payload.data.token;
        }
      })
      .addCase(logIn.rejected, () => { });
  },
});
export const { setUserInfo, goOutLogin } = user.actions;
export const logIn = createAsyncThunk("logIn", async function (body) {
  try {
    const result = await login(body);
    return result;
  } catch (error) {
    return error;
  }
});
export const getInfo = () => {
  return async (dispatch,) => {
    try {
      const { data } = await getInfoApi();
      dispatch(setUserInfo(data));
    } catch (error) {
      console.log(error);
      dispatch(goOutLogin());
    }
  };
};
export const logOut = () => {
  return async (dispatch,) => {
    dispatch(goOutLogin());
  };
};
export const useUserSate = () => useSelector((state) => state.user);
export default user.reducer;
