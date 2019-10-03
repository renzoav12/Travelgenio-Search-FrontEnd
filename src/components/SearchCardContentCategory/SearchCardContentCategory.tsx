import React, {Component} from 'react';

import './SearchCardContentCategory.scss';

export interface SearchCardContentCategoryProps {
    id: string;
    code: string;
};

const starIcon = require("../../assets/images/icons/star_icon.svg");

class SearchCardContentCategory extends Component<SearchCardContentCategoryProps> {
    getStars = () => {
        let starsElements: JSX.Element[] = [];
        let stars = parseInt(this.props.code);
        for (let index = 0; index < stars; index++) {
            starsElements.push(<img className="otravo-card-star" src={starIcon} key={index}/>);
        }
        return starsElements;
    }

    render() {
        return <div>
            {this.getStars()}
        </div>;
    }
}

export default SearchCardContentCategory;
