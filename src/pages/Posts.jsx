import '../styles/App.css';
import {useEffect, useState} from "react";
import MyButton from "../components/UI/button/MyButton";
import React from "react";
import MyModal from "../components/UI/MyModal/MyModal";
import PostForm from "../components/PostForm";
import PostFilter from "../components/PostFilter";
import PostList from "../components/PostList";
import Pagination from "../components/UI/pagination/Pagination";
import {getPageCount} from "../utils/pages";
import PostService from "../API/PostService";
import {useFetching} from "../hooks/useFetching";
import {usePost} from "../hooks/usePosts";
import MyLoader from "../components/UI/loader/MyLoader";



function Posts() {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({sort: '', query: ''});
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);


    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data)
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit))
    });

    const sortedAndSearchedPosts = usePost(posts, filter.sort, filter.query);

    useEffect(() => {
        fetchPosts(limit, page);
    }, [])

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    };

    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
    };

    const changePage = (page) => {
        setPage(page)
        fetchPosts(limit, page)
    }
    return (
        <div className="App">

            <MyButton style={{marginTop: '30px'}} onClick={() => setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <hr style={{margin: '15px 0'}}/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {postError &&
            <h1>Произошла ошибка ${postError}</h1>
            }
            {isPostsLoading
                ? <div style={{display: 'flex', justifyContent: 'center', marginTop: '50px'}}><MyLoader/></div>
                : <PostList remove={removePost} posts={sortedAndSearchedPosts} title="Список постов 1"/>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPage={totalPages}
            />


        </div>
    )
}

export default Posts;