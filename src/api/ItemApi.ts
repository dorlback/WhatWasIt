import axios, { AxiosInstance } from "axios";

class ItemApi {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  // 아이템 리스트 가져오기
  async getItems(): Promise<any> {
    const response = await this.api.get("/items/list");
    return response.data;
  }
  // // 특정 아이템 가져오기
  // getItem(itemId: number): Promise<any> {
  //   return this.api.get(`/items/${itemId}`).then(response => response.data);
  // }

  // // 아이템 추가
  // addItem(itemData: any): Promise<any> {
  //   return this.api.post('/items', itemData).then(response => response.data);
  // }

  // // 아이템 수정
  // updateItem(itemId: number, itemData: any): Promise<any> {
  //   return this.api.put(`/items/${itemId}`, itemData).then(response => response.data);
  // }

  // // 아이템 삭제
  // deleteItem(itemId: number): Promise<any> {
  //   return this.api.delete(`/items/${itemId}`).then(response => response.data);
  // }
}

export default ItemApi;
