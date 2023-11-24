export interface AuthResponse {
  code: number;
  data: {
    token: string;
    user: {
      id: number;
      username: string;
      phone: string;
      user_type: "CLIENT" | "PROVIDER";
    };
  };
}

export interface RegisterResponse {
  token: string;
}
