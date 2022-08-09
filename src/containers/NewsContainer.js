import React, {useState, useEffect} from 'react'; 
import NewsSelect from '../components/NewsSelect';
import NewsDetail from '../components/NewsDetail';

const NewsContainer = () => {

    // const [newsStories, setNewsStories] = useState([]);
    const [selectedStory, setSelectedStory] = useState(null);
    const [top20, setTop20] = useState([]);

    useEffect( () => {
        fetch("https://hacker-news.firebaseio.com/v0/topstories.json").then(
            (res => res.json())
        ).then(
            (data) =>  {
            const topStories = data.slice(0, 20);
            setTop20(topStories);
            const promisedStories = topStories.map((topStory) => {
                    return fetch(`https://hacker-news.firebaseio.com/v0/item/${topStory}.json`)
                    .then((res) => (res.json()))
                })
            
            console.log(promisedStories)
            Promise.all(promisedStories).then((data) => {
                setTop20(data);
            })
        } 
        )
    }, [])

    const handleSelectChange = ( story ) => {
        setSelectedStory( story );
    }

    return (
        <div>
            <h1>News</h1>
            <NewsSelect newsStories={ top20 } handleSelectChange={ handleSelectChange } />
            { selectedStory ? <NewsDetail newsStory={ selectedStory } /> : null }
        </div>
    )
}


export default NewsContainer;