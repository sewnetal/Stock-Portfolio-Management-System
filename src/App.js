import React, { Component } from 'react';
import SpmsList from './spms/SpmsList';
import './App.css';
import axios from "axios";
import { BrowserRouter as Router } from 'react-router-dom';





class App extends Component {
    constructor (props) {
        super(props)
        this.createPortfolio = this.createPortfolio.bind(this);
        this.removeportfolio = this.removeportfolio.bind(this);
        this.addstocks = this.addstocks.bind(this);
        this.removeStock = this.removeStock.bind(this);
        this.changeToEuro = this.changeToEuro.bind(this);
        this.changeToUSD = this.changeToUSD.bind(this);
        this.state = {

            portfolio: [],
            totalValue: [],

        }

    }
    addstocks(i){
        let addStock = this.state.portfolio;
        let stockname = prompt("Enter symbole of the stock you want to add");
        let Quantity =  prompt("Enter the amount of share you would like to buy");
        if(stockname != null){
            if (addStock[i][1].length <= 49){
                const key = 'AAIUPSWSMLJBOES3';
                const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockname}&apikey=${key}`;
                axios.get(url)
                    .then(res => {
                        addStock[i][1].push({
                            stock: res.data['Global Quote']['01. symbol'],
                            price: res.data['Global Quote']['05. price'],
                            Quantity: Quantity,
                            Total: (Number(Quantity)* res.data['Global Quote']['05. price']).toFixed(2),
                            Currency: "$"
                        });

                        addStock[i][2].push(Number(Quantity)* res.data['Global Quote']['05. price']);
                        this.setState({
                            portfolio:addStock,
                        });
                        localStorage.setItem("portfolio", JSON.stringify(addStock));
                    });

            }

            else {
                alert('You have reached max number of stocks ');
            }

        }
        console.log(addStock)

    }
    createPortfolio(event){
        event.preventDefault();
        
        let addportfolio = this.state.portfolio;
        let name = [];
        const person = prompt("Please enter Portfolio name", "");
        if ( person != null){
            if (addportfolio.length<= 9){
                name.push ({name:person},[],[]);
                addportfolio.push(name);
                this.setState ({
                    portfolio: addportfolio,
                });
            }
            else {
                alert('You have reached max number of portfolio ');
            }
        }
        console.log(addportfolio);
        localStorage.setItem("portfolio", JSON.stringify(addportfolio));
    }


    removeportfolio(i){
        let portfolio = this.state.portfolio;
        portfolio.splice(i,1);

        this.setState({
            portfolio: portfolio
        });
        localStorage.setItem("portfolio", JSON.stringify(portfolio));
    }

    removeStock(i,x){
        let portfolio = this.state.portfolio;
        portfolio[x][1].splice(i,1);
        portfolio[x][2].splice(i,1);
        console.log(i);

        this.setState({
            portfolio: portfolio
        });
        localStorage.setItem("portfolio", JSON.stringify(portfolio));
    }
    changeToEuro(i){
        let portfolio = this.state.portfolio;
        let stocks = portfolio[i][1];
        let totalValue = portfolio[i][2];

        const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=AAIUPSWSMLJBOES3`;

        for (let x = 0; x < stocks.length;  x++){
            if (stocks[x].Currency === "$"){

                axios.get(url)
                    .then(res => {
                        stocks[x].price = (stocks[x].price * res.data['Realtime Currency Exchange Rate']['5. Exchange Rate']).toFixed(2);
                        stocks[x].Total = (stocks[x].Total * res.data['Realtime Currency Exchange Rate']['5. Exchange Rate']).toFixed(2);
                        stocks[x].Currency = "€";
                        totalValue[x] = (Number(totalValue[x]) * res.data['Realtime Currency Exchange Rate']['5. Exchange Rate']).toFixed(2);
                         

                         this.setState ({
                             portfolio: portfolio,
                         });
                         //localStorage.setItem("portfolio", JSON.stringify(portfolio));

                    });
            }
        }
    }
    changeToUSD(i){
        let portfolio = this.state.portfolio;
        let stocks = portfolio[i][1];
        let totalValue = portfolio[i][2];

        const url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=EUR&to_currency=USD&apikey=AAIUPSWSMLJBOES3`;

        for (let x = 0; x < stocks.length;  x++){
            if (stocks[x].Currency === "€"){

                axios.get(url)
                    .then(res => {
                        stocks[x].price = (stocks[x].price * res.data['Realtime Currency Exchange Rate']['5. Exchange Rate']).toFixed(2);
                        stocks[x].Total = (stocks[x].Total * res.data['Realtime Currency Exchange Rate']['5. Exchange Rate']).toFixed(2);
                        stocks[x].Currency = "$";
                        totalValue[x] = (Number(totalValue[x]) * res.data['Realtime Currency Exchange Rate']['5. Exchange Rate']).toFixed(2);
                           console.log(totalValue.length)
                         this.setState ({
                             portfolio: portfolio,
                         });
                           //localStorage.setItem("portfolio", JSON.stringify(portfolio));

                    });
            }
        }
    }

    hydrateStateWithLocalStorage() {
        // for all items in state
        for (let key in this.state) {
            // if the key exists in localStorage
            if (localStorage.hasOwnProperty(key)) {
                // get the key's value from localStorage
                let value = localStorage.getItem(key);

                // parse the localStorage string and setState
                try {
                    value = JSON.parse(value);
                    this.setState({ [key]: value });
                } catch (e) {
                    // handle empty string
                    this.setState({ [key]: value });
                }
            }
        }
    }
    componentDidMount() {
        this.hydrateStateWithLocalStorage();
    }

    render() {
    return (


            <div className = "container">

                <input className="add" onClick={this.createPortfolio} type="button" value="Add new portfolio"/>
               <SpmsList  portfolio ={this.state.portfolio}
                          removeportfolio = {this.removeportfolio}
                          name ={this.state.name}
                          addstocks ={this.addstocks}
                          symbols = {this.state.symbol}
                          removeStock = {this.removeStock}
                          changeToEuro = {this.changeToEuro}
                          changeToUSD = {this.changeToUSD}
                          />


            </div>






                    )
  }
}

export default App;
