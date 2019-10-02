import React, { Component, SFC } from 'react'
import Autosuggest, { InputProps, SuggestionsFetchRequestedParams } from 'react-autosuggest'

import './Autocomplete.scss'

export interface SuggestionEntry {
  code: string
  type: string
  name: string
}

export interface AutocompleteState {
  suggestions: Array<SuggestionEntry>
  inputValue: string
}

export interface AutocompleteProps {
  value: string
  onChange(suggestionEntry: SuggestionEntry): void
}

const languages: Array<SuggestionEntry> = [
  { code: '1', type: 'CITY', name: 'Miami' } ,
  { code: '2', type: 'AIRPORT', name: 'Miami 2' } ,
  { code: '3', type: 'POI', name: 'Miami 3' } ,
  { code: '4', type: 'ACCOMMODATION', name: 'Miami 4' } 
];

const cityIcon = require('../../assets/images/icons/location_icon.svg');
const accommodationIcon = require('../../assets/images/icons/building_icon.svg');
const airportIcon = require('../../assets/images/icons/airport_icon.svg');
const poiIcon = require('../../assets/images/icons/point-of-interest_icon.svg');

const icons:Map<string, string> = new Map(
  [
    ["CITY", cityIcon], 
    ["ACCOMMODATION", accommodationIcon], 
    ["AIRPORT", airportIcon],
    ["POI", poiIcon]
  ]);

const renderSuggestion: SFC<SuggestionEntry> = (suggestion: SuggestionEntry) => (
  <div className={"otravo-suggestion"}>
    <div className="otravo-suggestion-type"><img className="otravo-suggestion-icon" src={icons.get(suggestion.type)}/></div>
    <div className="otravo-suggestion-name">{suggestion.name}</div>
  </div>
)

const getSuggestions = (value: String) => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  var suggestion = inputLength === 0 ? [] : languages.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
  return suggestion;
};

class Autocomplete extends Component<AutocompleteProps, AutocompleteState> {
  state = {
    suggestions: [],
    inputValue: this.props.value
  }

  onSuggestionsClearRequested = (): void => {
    this.setState({ 
      suggestions: []
    })
  }

  onChangeInputValue = ({}, { newValue }): void => {
    this.setState({ inputValue: newValue })
  }

  onSuggestionSelected = ({ target }, { suggestion }): void => {
    const { onChange } = this.props
    onChange(suggestion);
    target.blur()
  }

  onSuggestionsFetchRequested = (params: SuggestionsFetchRequestedParams) => {
    this.setState({
      suggestions: getSuggestions(params.value)
    });
  };

  shouldRenderSuggestions = (input: string): boolean => {
    return input.trim().length > 1
  }

  getSuggestionName(suggestion: SuggestionEntry) {
    return suggestion.name;
  }

  render() {
    const { value } = this.props
    const { suggestions, inputValue } = this.state
    
    const inputProps: InputProps<SuggestionEntry> = {
      onChange: this.onChangeInputValue,
      value: inputValue && inputValue.length > 0 ? inputValue : value,
    }

    return (
      <div>
        <label htmlFor={"asd"} className="otravo-label">Destino / Nombre del alojamiento:</label>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          focusInputOnSuggestionClick={false}
          highlightFirstSuggestion={true}
          getSuggestionValue={this.getSuggestionName}
          shouldRenderSuggestions={this.shouldRenderSuggestions}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          id={"asd"}/>
      </div>
    )
  }
}

export default Autocomplete
