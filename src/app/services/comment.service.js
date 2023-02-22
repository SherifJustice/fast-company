<<<<<<< HEAD
import httpService from "./http.service";
const commentEndpoint = "comment/";

const commentService = {
    createComment: async (payload) => {
        const { data } = await httpService.put(
            commentEndpoint + payload._id,
            payload
        );
        return data;
    },
    getComments: async (pageId) => {
        const { data } = await httpService.get(commentEndpoint, {
            params: {
                orderBy: '"pageId"',
                equalTo: `"${pageId}"`
            }
        });
        return data;
    },
    removeComment: async (commentId) => {
        const { data } = await httpService.delete(commentEndpoint + commentId);
        return data;
    }
};
export default commentService;
=======
import httpService from "./http.service"
const commentEndpoint = "comment/"

const commentService = {
  createComment: async (payload) => {
    const { data } = await httpService.put(
      commentEndpoint + payload._id,
      payload
    )
    return data
  },
  getComments: async (pageId) => {
    const { data } = await httpService.get(commentEndpoint, {
      params: {
        orderBy: '"pageId"',
        equalTo: `"${pageId}"`
      }
    })
    return data
  },
  removeComment: async (commentId) => {
    const { data } = await httpService.delete(commentEndpoint + commentId)
    return data
  }
}
export default commentService
>>>>>>> 8f585a6ad783ff5c8179c7b04876d953e6c27ef1
