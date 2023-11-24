import AuthService from "@/services/Auth/AuthService";
import {
  caregiverData,
  caregiverRegistartionForm,
  memberData,
  memberRegistartionForm,
} from "@/ts/types";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface UserData {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async function (userData: UserData) {
    const { email, password } = userData;
    const response = await AuthService.login(email, password);
    return response;
  }
);

export const registerCaregiver = createAsyncThunk(
  "register",
  async function (formData: caregiverRegistartionForm) {
    const caregiverData: caregiverData = {
      user: {
        email: formData.email,
        password: formData.password,
        givenName: formData.givenName,
        surname: formData.surname,
        city: formData.city,
        phoneNumber: formData.phoneNumber,
        profileDescription: formData.profileDescription,
      },
      caregiver: {
        photo: formData.photo,
        gender: formData.gender,
        caregivingType: formData.caregivingType,
        hourlyRate: formData.hourlyRate,
      },
    };
    const response = await AuthService.registerCaregiver(caregiverData);
    console.log(response);

    // return response;
  }
);

export const registerMember = createAsyncThunk(
  "register",
  async function (formData: memberRegistartionForm) {
    const memberData: memberData = {
      user: {
        email: formData.email,
        password: formData.password,
        givenName: formData.givenName,
        surname: formData.surname,
        city: formData.city,
        phoneNumber: formData.phoneNumber,
        profileDescription: formData.profileDescription,
      },
      member: {
        houseRules: formData.houseRules,
      },
      address: {
        houseNumber: formData.houseNumber,
        street: formData.street,
        town: formData.town,
      },
    };
    console.log(memberData);
    await AuthService.registerMember(memberData);
    // return response;
  }
);

export const logout = createAsyncThunk("auth/logout", async function () {
  await AuthService.logout();
});

interface userState {
  isAuth: boolean;
}

const initialState: userState = {
  isAuth: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.fulfilled, (state, { payload }) => {
        localStorage.setItem("token", payload.data.data.token);
        state.isAuth = true;
      })
      .addCase(login.rejected, (state, { payload }) => {
        console.log("login failed: Info -> ", state, payload);
      })
      .addCase(registerCaregiver.rejected, (state, { payload }) => {
        console.log("registration failed: Info -> ", state, payload);
      })
      .addCase(logout.fulfilled, (state) => {
        localStorage.clear();
        state.isAuth = false;
      })
      .addCase(logout.rejected, (state, { payload }) => {
        console.log("logout failed: Info -> ", state, payload);
      });
  },
});

export default authSlice.reducer;
