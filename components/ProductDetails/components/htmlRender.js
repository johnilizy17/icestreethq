import React from 'react';
import HTMLRenderer from 'react-html-renderer';

export default function HTMLState({ item }){

    return (
        <HTMLRenderer html={item} />
    )
}