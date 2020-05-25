import React from 'react'
import Post from "./Post"

export default ({ posts }) => {

    if (!posts.lengh) {
        return <p className="text-center">Постоп пока нет</p>
    }

    return posts.map(post => < Post post = { post }
        key = { post }
        />)
    }