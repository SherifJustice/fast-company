<<<<<<< HEAD
import httpService from "./http.service";
import localStorageService from "./localStorage.service";

const userEndpoint = "user/";

const userService = {
    get: async () => {
        const { data } = await httpService.get(userEndpoint);
        return data;
    },
    create: async (payload) => {
        const { data } = await httpService.put(
            userEndpoint + payload._id,
            payload
        );
        return data;
    },
    getCurrentUser: async () => {
        const { data } = await httpService.get(
            userEndpoint + localStorageService.getUserId()
        );
        return data;
    },
    update: async (payload) => {
        const { data } = await httpService.patch(
            userEndpoint + localStorageService.getUserId(),
            payload
        );
        return data;
    }
};
export default userService;
=======
import httpService from "./http.service"
import localStorageService from "./localStorage.service"

const userEndpoint = "user/"

const userService = {
  get: async () => {
    const { data } = await httpService.get(userEndpoint)
    return data
  },
  create: async (payload) => {
    const { data } = await httpService.put(userEndpoint + payload._id, payload)
    return data
  },
  getCurrentUser: async () => {
    const { data } = await httpService.get(
      userEndpoint + localStorageService.getUserId()
    )
    return data
  },
  update: async (payload) => {
    const { data } = await httpService.patch(
      userEndpoint + localStorageService.getUserId(),
      payload
    )
    return data
  }
}
export default userService
>>>>>>> 8f585a6ad783ff5c8179c7b04876d953e6c27ef1
