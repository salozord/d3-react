import React, { Component } from 'react';
import BarChart from './BarChart';

import './index.css'

class App extends Component {
    render() { 
        return ( 
            <div>
                <h1>Gráfico de barras animado</h1>
                <BarChart />
            </div>
        );
    }
}
 
export default App;