import * as React from 'react';
import { Component, useState, useEffect } from "react";
import { Admin, Resource, DataProvider } from 'react-admin';
import polyglotI18nProvider from 'ra-i18n-polyglot';

import './App.css';

import i18nProvider from '../translate/i18nProvider';
import myDataProvider  from '../apis/dataProvider';
import authProvider from '../helper/authProvider';
import themeReducer from '../helper/themeReducer';

import customRoutes from '../routes/routes';
import { Dashboard } from '../pages/Dashboard/';

import users from '../pages/Users';
import recipes from '../pages/Recipes';
//import posts from '../pages/Posts';
import categories from '../pages/Categories';
import reviews from '../pages/Reviews';
import tags from '../pages/Tags';
import planners from '../pages/Planners';

import { Login, Layout } from '../layouts';
import MainLayout from '../layouts/MainLayout';

class App extends Component {
  render() {
    return (
      <Admin 
        title="Admin Dashboard"
        dataProvider={myDataProvider} 
        i18nProvider={i18nProvider}
        authProvider={authProvider}
        dashboard={Dashboard}
        loginPage={Login}
        layout={MainLayout}
        customReducers={{theme: themeReducer}}
        customRoutes={customRoutes}
      > 
        {permissions => [
        <Resource name="recipes" {...recipes} />,
        <Resource name="categories" {...categories} />,
        permissions ? <Resource name="users" {...users} /> : null,
        <Resource name="reviews" {...reviews} />,
        <Resource name="tags" {...tags} />,
        <Resource name="planners" {...planners} />,
        ]}
      </Admin>
    );
  }
}
export default App;