import { useState, useEffect } from "react";

export default function App() {
  const [ids, setIds] = useState([]);
  const [posts, setPosts] = useState([]);
  const [current,setCurrent] = useState(0);

  const fetchPostsId = async () => {
    const response = await fetch(
      "https://hacker-news.firebaseio.com/v0/jobstories.json",
    );
    const data = await response.json();
    //console.log(data);
    setIds(data);
    return data;
  };

  const fetchJobDetails = async (id) => {
    const response = await fetch(
      `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
    );
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const fetchAllJobDetails = async () => {
      const jobIds = await fetchPostsId();

      // for (const id of jobIds) {
      //   const t = await fetchJobDetails(id);
      //   fetchedDetails.push(t);
      // }

      // OR
      const fetchedPromises = jobIds.map((id) => fetchJobDetails(id));
      const t = await Promise.all(fetchedPromises);
      setPosts(t);
    };
    fetchAllJobDetails();
  }, []);

  const totalOpenings = posts.length;
  const pageSize = 6;
  const start = current*pageSize;
  const end = start + pageSize;

  const formattedDate = (time)=>{
      date = new Date(time*1000);
      console.log("Date : ",date);
      const formatDate = date.toLocaleString('en-Us',{
        weekday:'short',
        day:'2-digit',
        month:'short',
        year:'numeric',
        hour:'2-digit',
        minute:'2-digit',
        second:'2-digit',
        month:'2-digit',
        hour12:false
      })
      console.log(formatDate);
      return formatDate;
  }

  const handleNext = ()=>{
    setCurrent((prev)=>(prev+1));
  }

  const handleBack = ()=>{
    setCurrent((prev)=>(prev-1));
  }

  console.log(posts);

  return (
    <div className="container">
      <h1> Hacker News Jobs Board </h1>
      <div>
        {posts.slice(start,end).map((post) => (
          <div
            href={post.url}
            key={post.id}
            target="_blank"
            style={{
              border: "1px solid black",
              padding: "10px",
              margin: "8px",
              marginTop:"2px",
              backgroundColor:"white",
            }}
          >
            <h4>
            <a href={post.url}
            rel="noopener noreferrer">
            {post.title}
            </a> 
            </h4>
            <div>
              By {post.by} . {formattedDate(post.time)}{" "}
            </div>
          </div>
        ))}
        <button 
        onClick={handleNext}
        disabled={current==Math.floor(totalOpenings/6)}
        >
        Load More
       </button>
       
        
        <button 
        onClick={handleBack}
        disabled={current==0}
        >
           ⬅️
        </button>
       
      </div>
      
    </div>
  );
}
