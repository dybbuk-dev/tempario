import * as React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import Pay from "./pages/Pay";
import WorkshopArea from "./pages/WorkshopArea";
import Home from "./pages/Home";

const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/pay" component={Pay} />
                <Route exact path="/workshoparea" component={WorkshopArea} />
                <Route exact path='/' component={Home} />
            </Switch>
        </Router>
    );
}

export default App;
