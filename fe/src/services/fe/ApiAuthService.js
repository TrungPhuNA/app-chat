import { postMethod } from "../../helpers/apiClient"

export const AuthService = {
	async register (data) {
		return await postMethod("auth/register", data);
	},
	async login (data) {
		return await postMethod("auth/login", data);
	}
}