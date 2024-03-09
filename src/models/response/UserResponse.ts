import { UserData } from "@/models/User";

export interface UserResponse {
	data: UserData;
	message?: string;
}
