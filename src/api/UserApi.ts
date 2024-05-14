import axios, { AxiosInstance } from "axios";

interface iUserIn {
  email: string | null | undefined;
  password1: string | null | undefined;
  password2: string | null | undefined;
  username: string | null | undefined;
}

class UserApi {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/user`,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async verifyIsUser(userIn: iUserIn): Promise<any> {
    try {
      const response = await this.api.post("/is-user", userIn);
      return response.data;
    } catch (error) {
      console.error("error");
    }
  }

  async getUser(userEmail: string | null | undefined): Promise<any> {
    try {
      const response = await this.api.get(`get-user/${userEmail}`);
      return response.data;
    } catch (error) {
      console.error("error");
    }
  }
}

export default UserApi;
