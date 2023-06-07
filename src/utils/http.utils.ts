import axios from "axios";
import { API_KEY } from "../common/constants";

export const axiosInstance = axios.create({
	baseURL: "https://the-one-api.dev/v2",
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
		Authorization: `Bearer ${API_KEY}`,
	},
});