import React from 'react'
import Post from './Post'
import { useDispatch, useSelector } from 'react-redux'
import { fetchedPosts } from '../redux/actions'


export default () => {

    const dispatch = useDispatch()
    const posts = useSelector(state => state.posts.fetchedPosts)

    if (!posts.length) {
        return <button className = "btn btn-primary"
        onClick = { 
            () => dispatch(fetchedPosts()) } > Загрузить </button>
    }
    return posts.map(post => < Post post = { post }
        key = { post.id }
        />)
    }