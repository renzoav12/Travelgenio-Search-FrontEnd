import React from 'react';
import SearchCardListContainer from '../../containers/SearchCardList';
import SearchBoxContainer from '../../containers/SearchBox';
import DummyCard from '../DummyCard/DummyCard';

const Search = () => {
    return (
        <div className="container-fluid">
            <div className="row">
                <aside className="col-3">
                    <SearchBoxContainer></SearchBoxContainer>
                </aside>

                <div className="col-9">
                    <SearchCardListContainer></SearchCardListContainer>
                </div>
            </div>
        </div>
    );
};

export default Search;