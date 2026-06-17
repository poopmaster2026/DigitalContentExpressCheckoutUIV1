import axios from "axios";

// BE 接続時にやること:
// 3. baseURL を環境変数に差し替える → baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
// 4. 下記インターセプターのコメントを外し、トークン取得処理を実装する

export const apiClient = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

// TODO: 認証方式が未定のため、決定後にインターセプターを実装する
// （例: JWT Bearer / Cookie / API Key など）
// 認証トークンを全リクエストに付与する
// apiClient.interceptors.request.use((config) => {
//   const token = getAuthToken();
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// TODO: 認証方式が未定のため、決定後に 401 時のリフレッシュ処理を実装する
// apiClient.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     if (error.response?.status === 401) {
//       await refreshToken();
//       return apiClient.request(error.config);
//     }
//     return Promise.reject(error);
//   }
// );
