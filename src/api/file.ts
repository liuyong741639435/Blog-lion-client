import request from "../utils/request";

export const ApiUpload = (data: { files: any[] | any }) =>
  request.post<any, API.Response<any>>("/files/upload", data, {
    headers: {
      "Content-type": "multipart/form-data",
    },
  });
