import React, { FunctionComponent, useState, useEffect } from 'react'
import suggestionApi from '../../api/suggestions/suggestions'
import Autosuggest, { InputProps, SuggestionsFetchRequestedParams } from 'react-autosuggest'

import './Autocomplete.scss'

export interface SuggestionEntry {
  code: string
  type: string
  name: string
}

export interface AutocompleteProps {
  code: string
  type: string
  onChange(suggestionEntry: SuggestionEntry): void
}

const cityIcon = require('../../assets/images/icons/location_icon.svg');
const accommodationIcon = require('../../assets/images/icons/building_icon.svg');
const airportIcon = require('../../assets/images/icons/airport_icon.svg');
const poiIcon = require('../../assets/images/icons/point-of-interest_icon.svg');

const icons:Map<string, string> = new Map(
  [
    ["CITY", cityIcon], 
    ["ACCOMMODATION", accommodationIcon], 
    ["AIRPORT", airportIcon],
    ["POINT_OF_INTEREST", poiIcon]
  ]);

const renderSuggestion: FunctionComponent<SuggestionEntry> = (suggestion: SuggestionEntry) => (
  <div className={"otravo-suggestion"}>
    <div className="otravo-suggestion-type"><img className="otravo-suggestion-icon" src={icons.get(suggestion.type)}/></div>
    <div className="otravo-suggestion-name">{suggestion.name}</div>
  </div>
)

const Autocomplete: FunctionComponent<AutocompleteProps> = props => {

  const [suggestions, setSuggestions] = useState<Array<SuggestionEntry>>(new Array());
  const [inputValue, setInputValue] = useState<string>("");


  useEffect(() => {
    setInitialSuggestionName();
  }, []);


  const getHints = (value: String) => {
    try {
      suggestionApi.get('/hint', {
        params: {text: value}
      }).then((response) => {
        setSuggestions(response.data);
      });
    } catch(e) {
      console.error(e);
    }
  }

  const setInitialSuggestionName = () => {

    const {type, code} = props;

    try {
      suggestionApi.get('/suggestions', {
        params: {type, code}
      }).then((response) => {
        setInputValue(getSuggestionName(response.data));
      });
    } catch(e) {
      console.error(e);
    }
  }

  const onSuggestionsClearRequested = (): void => {
    setSuggestions([]);
  }

  const onChangeInputValue = ({}, { newValue }): void => {
    setInputValue(newValue);
  }

  const onSuggestionSelected = ({ target }, { suggestion }): void => {
    const { onChange } = props
    onChange(suggestion);
    target.blur()
  }

  const onSuggestionsFetchRequested = (params: SuggestionsFetchRequestedParams) => {
    getHints(params.value);
  };

  const shouldRenderSuggestions = (input: string): boolean => {
    return input.trim().length > 2
  }

  const getSuggestionName = (suggestion: SuggestionEntry) => {
    return suggestion.name;
  }

  const inputProps: InputProps<SuggestionEntry> = {
    onChange: onChangeInputValue,
    value: inputValue
  }

  return <div>
      <label htmlFor={"asd"} className="otravo-label">Destino / Alojamiento:</label>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        onSuggestionSelected={onSuggestionSelected}
        focusInputOnSuggestionClick={false}
        highlightFirstSuggestion={true}
        getSuggestionValue={getSuggestionName}
        shouldRenderSuggestions={shouldRenderSuggestions}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}/>
    </div>
  
}

export default Autocomplete;
