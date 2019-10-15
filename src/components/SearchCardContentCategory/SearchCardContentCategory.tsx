import React, {Component} from 'react';

import './SearchCardContentCategory.scss';

export interface SearchCardContentCategoryProps {
    id: string;
    code: string;
};

const starIcon = require("../../assets/images/icons/star_icon.svg");


const SearchCardContentCategory = (props: SearchCardContentCategoryProps) => {

    const getStars = () => {
        let starsElements: JSX.Element[] = [];
        let stars = parseInt(props.code);
        for (let index = 0; index < stars; index++) {
            starsElements.push(<img className="otravo-card-star" src={starIcon} key={index}/>);
        }
        return starsElements;
    }
    
    return <div>
        {getStars()}
    </div>;
}

export default SearchCardContentCategory;
