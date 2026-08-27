export class ApiError extends Error {
  status: number;

  constructor(status: number, message = "API request failed") {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}
