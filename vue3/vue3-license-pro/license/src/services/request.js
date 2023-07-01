import { axiosPost } from "@/libs/http";

function getData(options) {
  const { subjectId, modelType } = options;
  return new Promise((resolve, reject) => {
    axiosPost({
      url: "http://127.0.0.1:8000/query",
      data: {
        subject: subjectId,
        model: modelType,
      },
      success(data) {
        resolve(data);
      },
      error(err) {
        reject(err);
      },
    });
  });
}

export { getData };
