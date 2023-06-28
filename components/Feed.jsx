import { postcss } from 'autoprefixer'
import {useState,useEffect} from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({data,handleTagClick})=>{
  return (
    <div className='mt-16 prompt_layout'>
      {data?.map(post=>(
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText,setSearchText] = useState("")
  const [posts,setPosts] = useState(null)
  const [filteredPosts,setFilteredPosts] = useState(null)

  useEffect(()=>{
    const getPosts = async () => {
      try{
        const response = await fetch("api/prompt")
        const data = await response.json()
        setPosts(data)
        setFilteredPosts(data)
      }catch(error){
        console.log(error)
      }
    }
    getPosts()
  },[])

  useEffect(()=>{
    const handleSearch = () => {
      if(posts){
        const searchRegx = new RegExp(searchText,'i')
        setFilteredPosts(
          posts.filter(
            post=>searchRegx.test(post.creator.username)
            || searchRegx.test(post.tag)
            || searchRegx.test(post.prompt)
            )
        )
      }   
    }
    handleSearch()
  },[searchText])

  

  const handleTagClick = (e) => {
    setSearchText(e.target.innerText)
  }

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type="text"
          className='search_input peer'
          value={searchText}
          onChange={(e)=> {
            setSearchText(e.target.value)
          }}
          placeholder="Search for a tag or a username"
        />
      </form>
      <PromptCardList 
      data={filteredPosts} 
      handleTagClick={handleTagClick} 
      />
    </section>
  )
} 

export default Feed