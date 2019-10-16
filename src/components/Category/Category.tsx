import React, {Component} from 'react';
import StarIcon from '@material-ui/icons/Star';
import './Category.scss';

export interface CategoryProps {
    stars: number;
};

const Category = (props: CategoryProps) => {

    const getStars = () => {
        let starsElements: JSX.Element[] = [];
        for (let index = 0; index < props.stars; index++) {
            starsElements.push(<StarIcon className="otravo-category-star" fontSize="small" key={index}/>);
        }
        return starsElements;
    }
    
    return <div>{getStars()}</div>;
}

export default Category;
