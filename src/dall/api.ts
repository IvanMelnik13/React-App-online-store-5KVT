import axios from "axios";

export const instance = axios.create({
	baseURL: 'api',
	withCredentials: true,
	headers: {
		"API-KEY": process.env.ApiKey,
	}
});

export type ResponseDataType<D = {}> = {
	data: D
	resultCode: number
	message: string | null
}