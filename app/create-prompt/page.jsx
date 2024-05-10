'use client';

import React from 'react'
import {useState} from 'react'
import {useSession} from 'react'
import {useRouter} from 'next/navigation'

import Form from '@components/Form';

const CreatePrompt = () => {

    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({

        prompt: '',
        tag: '',

    });
    
    const CreatePrompt = async (e) => {

    }

    return (
        <Form
            type='create'
            post = {post}
            setPost = {setPost}
            submitting = {submitting}
            handleSubmit = {CreatePrompt}
        />
    )

}


const page = () => {
  return (
    <div>Create Prompt</div>
  )
}

export default CreatePrompt