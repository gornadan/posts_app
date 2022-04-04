import React, {useContext} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router/index";
import {AuthContext} from "../context";
import MyLoader from "./UI/loader/MyLoader";


const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if(isLoading) {
        return <MyLoader/>
    }

    return (
        isAuth
        ?
            <Switch>
                {privateRoutes.map(route => {
                        return(
                            <Route
                                component={route.component}
                                path={route.path}
                                exact={route.exact}
                                key={route.path}
                            />
                        )
                    }
                )}
                <Redirect to='/posts'/>
            </Switch>
            :
            <Switch>
                {publicRoutes.map(route => {
                        return(
                            <Route
                                component={route.component}
                                path={route.path}
                                exact={route.exact}
                                key={route.path}
                            />
                        )
                    }
                )}
                <Redirect to='/login'/>

            </Switch>

    );
};

export default AppRouter;