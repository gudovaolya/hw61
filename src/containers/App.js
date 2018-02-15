import React, { Component, Fragment } from 'react';
import './App.css';
import Country from "../components/Country/Country";
import axios from 'axios';
import CountryInfo from "../components/CountryInfo/CountryInfo";

class App extends Component {

   state = {
       countries: [],
       selectedCountryCode: null,
       countryInfo: null,
       countryBordersInfo: null

   };

   componentDidMount() {
       const BASE_URL = 'https://restcountries.eu/rest/v2/';
       const ALL_COUNTRIES_URL = 'all?fields=name;alpha3Code';
       axios.get(BASE_URL + ALL_COUNTRIES_URL).then(response => {
           return response.data
       }).then(countries => {
           console.log(countries);
           this.setState({countries});
       }).catch(error => {
           console.log(error);
       });

   }

    componentDidUpdate() {
       if(this.state.selectedCountryCode !== null && (this.state.countryInfo === null || (this.state.countryInfo.alpha3Code !== this.state.selectedCountryCode))) {
           this.showCountryInfo();
       }
    }

   selectedCountry = (event) => {
       const currentId = event.target.id;
       const index = this.state.countries.findIndex(item => item.alpha3Code === currentId);
       const countryCode = {...this.state.countries[index]}.alpha3Code;
       this.setState({selectedCountryCode: countryCode});
   };

    showCountryInfo = () => {
        const BASE_URL = 'https://restcountries.eu/rest/v2/';
        axios.get(BASE_URL + 'alpha/' + this.state.selectedCountryCode).then(country => {

            if (country.data.borders.length !== 0) {
                return Promise.all(country.data.borders.map(code => {
                    return axios.get(BASE_URL + 'alpha/' + code).then(countryBorder => {
                        return countryBorder.data
                    })
                })).then(countryBordersInfoData => {
                    this.setState({countryBordersInfo: countryBordersInfoData, countryInfo: country.data})
                }).catch(error => {
                    console.log(error);
                });
            } else {
                this.setState({countryBordersInfo: null, countryInfo: country.data})
            }

        })

    };

    renderCountryInfo = () => {
        if (this.state.countryInfo && this.state.countryInfo.borders.length === 0) {
           return (
               <Fragment>
                   <CountryInfo
                       countryInfo = {this.state.countryInfo}
                   />
                   <div className="country-borders">
                       <p><b>This country borders:</b> this country has no common borders with other countries.</p>
                    </div>
               </Fragment>
           )
        } else if (this.state.countryInfo && this.state.countryInfo.borders.length !== 0){
            return (
                <Fragment>
                    <CountryInfo
                        countryInfo = {this.state.countryInfo}
                    />
                    <div className="country-borders">
                        <p><b>This country borders:</b>
                        {this.state.countryBordersInfo.map((item, index) => {
                            if (index !== (this.state.countryBordersInfo.length -1)) {
                                return(
                                    <span key={item.alpha3Code}>{item.name + ', '}</span>
                                )
                            } else {
                                return (
                                    <span key={item.alpha3Code}>{item.name + '.'}</span>
                                )
                            }

                        })}
                        </p>
                    </div>
                </Fragment>

            )
        } else {
            return (
               <h2>Country not selected</h2>
            )
        }
    };

    render() {
        return (
            <div className="container countries-block">
                <div className="row">
                    <section className="countries">
                        <h3>Список стран:</h3>
                        <div className="countries-list">
                            {this.state.countries.map(country => (
                                <Country
                                    key={country.alpha3Code}
                                    id={country.alpha3Code}
                                    name={country.name}
                                    clicked={this.selectedCountry}
                                />
                            ))}
                        </div>
                    </section>
                    <section className="country-info-block">
                        {this.renderCountryInfo()}
                    </section>
                </div>
            </div>
        );
    }
}

export default App;
