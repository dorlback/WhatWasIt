import axios, { AxiosInstance } from "axios";

interface iMemoIn {
  users: (string | null | undefined)[];
}

interface iCheckDataIn {
  uuid: string | null | undefined | any;
  user_email: string | null | undefined | any;
}

interface iUpdateMemoIn {
  unique_id: string | null | undefined | any;
  title: string | null | undefined | any;
  content: string | null | undefined | any;
}

interface iShareMemoIn {
  unique_id: string | null | undefined | any;
  user_email: string | null | undefined | any;
}

class MemoApi {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/memo`,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async getMemo(userEmail: string | null | undefined): Promise<any> {
    try {
      const response = await this.api.get(`get-memos/${userEmail}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async createMemo(memoIn: iMemoIn): Promise<any> {
    try {
      const response = await this.api.post("create-memo", memoIn);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async updateMemo(memoUpdateIn: iUpdateMemoIn): Promise<any> {
    try {
      const response = await this.api.post("update-memo", memoUpdateIn);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async deleteMemo(unique_id: string): Promise<any> {
    try {
      const response = await this.api.delete(`delete-memo/${unique_id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async shareMemo(shareMemoIn: iShareMemoIn): Promise<any> {
    try {
      const response = await this.api.post(`share-memo`, shareMemoIn);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  async isValidUuid(checkDataIn: iCheckDataIn): Promise<any> {
    try {
      const response = await this.api.post(`is-valid-uuid`, checkDataIn);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
export default MemoApi;
