import React from 'react'
import Link from 'next/link'

const Form = ({type,post,handlePost,submitting,handleSubmitting}) => {
  return (
    <section className='w-full flex-start max-w-full flex-col'>
        <h1 className='head_text text-left'>
            <span className='blue_gradient'>{type} Post</span>
        </h1>
        <p className='desc text-left max-w-md'>
            {type} and share amazing prompts with the world,and let your run wild with AI-powered platform
        </p>
        <form onSubmit={handleSubmitting} className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism">
            <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Your AI Prompt
                </span>
            
            <textarea
            value={post.prompt}
            onChange={(e)=>{
                handlePost({...post,prompt:e.target.value})
            }}
            placeholder="Write your prompt here..."
            required
            className="form_textarea"
            >
            </textarea>
            </label>
            <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Tag{' '}
                    <span className='font-normal'>#product #webdevelopment #idea</span>
                </span>
            
            <input
            type="text"
            value={post.tag}
            onChange={(e)=>{
                handlePost({...post,tag:e.target.value})
            }}
            placeholder="#tag..."
            required
            className="form_input"
            />
            </label>
            <div className='flex-end mx-3 mb-5 gap-4'>
                <Link href="/" className="text-gray-500 text-sm">
                    Cancel
                </Link>
                <button 
                type='submit' 
                className='text-white bg-primary-orange rounded-full px-7 py-2' 
                disabled={submitting}
                >
                    {submitting?`${type}...`:type}
                </button>

            </div>
        </form>

    </section>
  )
}

export default Form