import React from 'react';
import './CountryInfo.css';

const CountryInfo = (props) => {
    return (
        <article className="country-info">
            <h1>{props.countryInfo.name}</h1>
            <div className="country-info-box">
                <p><b>Capital:</b> {props.countryInfo.capital}</p>
                <p><b>Region:</b> {props.countryInfo.region}</p>
                <p><b>Subregion:</b> {props.countryInfo.subregion}</p>
                <p><b>Population:</b> {props.countryInfo.population}</p>
            </div>
            <div className="country-flag">
                <img src={props.countryInfo.flag} alt={props.countryInfo.name}/>
            </div>
        </article>
    )
};

export default CountryInfo;