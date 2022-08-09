import React, {useState, useEffect} from 'react'; 
import NewsSelect from '../components/NewsSelect';
import NewsDetail from '../components/NewsDetail';

const NewsContainer = () => {

    const [newsStories, setNewsStories] = useState([]);
    const [selectedStory, setSelectedStory] = useState(null);
    const selectedStoryJson = `https://hacker-news.firebaseio.com/v0/item/${selectedStory}.json`
    const [selectedStoryApi, setSelectedStoryApi] = useState(null);


    useEffect( () => {
        fetch( 'https://hacker-news.firebaseio.com/v0/topstories.json' )
            .then( res => res.json() )
            .then( data => setNewsStories(data) )
    }, [] );

    useEffect( () => {
        fetch( selectedStoryJson )
            .then( res => res.json() )
            .then( data => setSelectedStoryApi(data) )
    }, [] )

    const handleSelectChange = ( story ) => {
        setSelectedStory( story );
        setSelectedStoryApi(selectedStoryJson);
    }

    return (
        <div>
            <h1>News</h1>
            <NewsSelect newsStories={ newsStories } handleSelectChange={ handleSelectChange } />
            { selectedStoryApi ? <NewsDetail newsStory={ selectedStoryApi } /> : null }
        </div>
    )
}


export default NewsContainer