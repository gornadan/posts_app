import axios from "axios";

export default class PostService {
    static async getAll(limit = 10, page = 1) {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
            params: {
                _limit: limit,
                _page: page
            }
        });
        return response
    }

    static async getById(postId) {

        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
        console.log(postId)
        return response;
    }

    static async getCommentsByPostId (id) {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        return response;
    }
}