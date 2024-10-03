import { baseUrl } from "../config/index";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    user: "",
    users: [],
    loading: false,
    error: null,
}

