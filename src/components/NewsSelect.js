import React from "react";
import NewsContainer from "../containers/NewsContainer";

 const NewsSelect = ({newsStories, handleSelectChange}) => {

    const handleChange = (event) => {
        const index = event.target.value;
        handleSelectChange(newsStories[index]);
      }
      const mainNewsStories = newsStories.map((newsStory, index) => {
        return <option key={index} value={index}>{newsStory.title}</option>
      });
  


    return (
        <select onChange={handleChange}>
            {mainNewsStories}
        </select>
    )
 }

export default NewsSelect