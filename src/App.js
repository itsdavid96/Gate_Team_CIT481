import React from 'react';
import './App.css';
import Chart from "../node_modules/chart.js/dist/chart.js";
import unirest from 'unirest';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      cryptos: []
    };
    this.fetchCryptoData = this.fetchCryptoData.bind(this);
  }

  componentDidMount() {
    console.log("App Component has mounted");
    console.log(this.state.cryptos);
  }

  fetchCryptoData = ()  => {
    const req = unirest("GET", "https://coinranking1.p.rapidapi.com/coins");
    let tempArray = [];

    // set headers for HTTP GET request
    req.headers({
      "x-rapidapi-key": "06c8ddbfb7msh87609e3fc655dc5p1b372fjsn9e847ef93c76",
      "x-rapidapi-host": "coinranking1.p.rapidapi.com",
      "useQueryString": true
    });

    // end function - set state
    req.end(function (res) {
      if (res.error) throw new Error(res.error);
      const decimals = 3;
      var chart1 = new Chart(document.getElementById("chartCrypto"), {
        type: 'bar',
        data: {
          labels: [res.body.data.coins[0].name, res.body.data.coins[1].name, res.body.data.coins[2].name, res.body.data.coins[3].name, res.body.data.coins[4].name],
          datasets: [
            {
              label: 'Top Crypto Coins!',
              data: [parseFloat(res.body.data.coins[0].price).toFixed(2),
              parseFloat(res.body.data.coins[1].price).toFixed(2),
              parseFloat(res.body.data.coins[2].price).toFixed(2),
              parseFloat(res.body.data.coins[3].price).toFixed(2),
              parseFloat(res.body.data.coins[4].price).toFixed(2)
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)'
              ],
              borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)'
              ],
              borderWidth: 1
            }
          ],
        },
        options: {
          scales: {
            yAxes: [{
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function(value, index, values) {
                        return '$' + value.toFixed(decimals);
                    }
                }
            }]
        }
        }
      });
    });

    console.log("This is tempArray");
    console.log(tempArray);
    this.setState({cryptos: tempArray}, () => {
      console.log("After setting state");
      console.log(this.state.cryptos);
    });
  }

  render() {
    return (
      <div className="App">
        <header>
          <div>
            <h1>GATE Team Crypto/Stocks App</h1>
            <p>
              View the top 5 highest performing Crypto currencies and Stocks. These rankings are based off of trends
              from the web.
            </p>
          </div>
        </header>
        <div className="row">
          <div>
            <button onClick={() => this.fetchCryptoData()}>
              Fetch Data
            </button>
          </div>
        </div>
        <div className="row" id="data">
          <div className="cryptoDiv">
            <canvas 
              id="chartCrypto"
            />
          </div>
          <div className="stocksDiv">
            <table className="stocksTable">
              <tr>
                <th className="tableTitle" colSpan="2">Stocks</th>
              </tr>
              <tr>
                <th>Stock Name</th>
                <th>Stock Price</th>
              </tr>
              <tr className="rowsTable2">
                <td>Tbd</td>
                <td>Tbd</td>
              </tr>
              <tr className="rowsTable2">
                <td>Tbd</td>
                <td>Tbd</td>
              </tr>
              <tr className="rowsTable2">
                <td>Tbd</td>
                <td>Tbd</td>
              </tr>
              <tr className="rowsTable2">
                <td>Tbd</td>
                <td>Tbd</td>
              </tr>
              <tr className="rowsTable2">
                <td>Tbd</td>
                <td>Tbd</td>
              </tr>
            </table>
          </div>
          {/* <div>
            <canvas 
              id="chartCrypto"
            />
          </div> */}
        </div>
      </div>
    );
  }
}

export default App;
