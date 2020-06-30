import React from 'react';
import { useLocation } from "react-router-dom";
import { useEffect } from 'react';

export default function PageTitle() {

    const [pageTitle, setPageTitle] = React.useState('Home')

    let location = useLocation()
    let PageTitles = ['Home', 'About']

    useEffect(() => {
        if (location.pathname !== '/') {
            let newTitle = location.pathname.substr(1)
            setPageTitle(newTitle.charAt(0).toUpperCase() + newTitle.slice(1))
        } else {
            setPageTitle('Home')
        }
    }, location)

    return pageTitle
}