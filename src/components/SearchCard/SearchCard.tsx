import React from 'react';

export interface SearchCardProps {
    content: SearchCardContent;
};

export interface SearchCardContent {
    id: string;
    title: string;
    images: SearchCardContentImage[];
};

export interface SearchCardContentImage {
    url: string;
};

const SearchCard = ({content}: SearchCardProps) => (
    <div className="card">
        <div className="image">
            <img height="100" width="140" src={content.images[0].url} alt="none" />
        </div>
        <div className="content">
            <div className="header">{content.title}</div>
            <div className="meta">
                <span className="category">*****</span>
            </div>
            <div className="description">
                <p></p>
            </div>
        </div>
    </div>
);

export default SearchCard;
