import {Component} from "react";
import React from "react";
import '../App.css';






class SpmsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            symbols: [],
            value: '',
        }

    };

    handelstock(e, i) {
        e.preventDefault();

        this.props.addstocks(i)
    }

    handlePortfolioDelete(e, i) {
        e.preventDefault();

        this.props.removeportfolio(i)
    }

    handleStockDelete(e, i,x){
        e.preventDefault();

        this.props.removeStock(i,x)
    }

    handleEuroChange(e, i){
        e.preventDefault();

        this.props.changeToEuro(i)
    }

    handleUSDChange(e, i){
        e.preventDefault();

        this.props.changeToUSD(i)
    }



    render() {
        return (
            <div>
                {this.props.portfolio.map((stocks, index) => {

                    return (

                        <div className="col-3" >
                            <button onClick={(stocks) => this.handlePortfolioDelete(stocks, index)}>&#x274E;</button>
                            <div>
                                <p>{stocks[0].name}<a href="#" onClick={(stocks) => this.handleEuroChange(stocks, index)}>
                                    Show in €</a> <a href="#"  onClick={(stocks) => this.handleUSDChange(stocks, index)}>
                                    Show in $</a></p>

                                    <table className="table table-bordered">
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Unit value</th>
                                            <th>Quantity</th>
                                            <th>Total value</th>
                                            
                                        </tr>
                                        </thead>
                                        {stocks[1].map((st,idx) =>{
                                            return (

                                                <tbody key={idx} >
                                                <tr >
                                                    <td>{st.stock}</td>
                                                    <td>{st.price} {st.Currency}</td>
                                                    <td>{st.Quantity}</td>
                                                    <td>{st.Total} {st.Currency}</td>
                                                    <td><button onClick={(stocks) => this.handleStockDelete(stocks, idx,index)}>&#x274E; </button></td>
                                                </tr>
                                                </tbody>
                                            )
                                        })}
                                        </table>


                                            <p>Total value of {stocks[0].name}: {stocks[2].reduce((a, b) => parseFloat(a) + parseFloat(b), 0)} </p>

                                <input className="add" onClick={(stocks) => this.handelstock(stocks, index)} type="button"
                                       value="Add stock"
                                       />
                                <input value="Perf graph" type="button"/>
                            </div>



                        </div>
                    );
                })}
            </div>
        );
    }
}

export default SpmsList;