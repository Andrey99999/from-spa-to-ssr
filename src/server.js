import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { matchRoutes, renderRoutes } from 'react-router-config'
import express from 'express'
import { Provider } from 'react-redux'
import serialize from 'serialize-javascript'
import '@babel/polyfill'

import Routes from './Routes'
import { store } from './store'
import { assetsByChunkName } from  '../dist/stats.json'

const app = express();

app.use(express.static(dist)); // раздаем папку dist

const renderer = (req, store, context) => {
    const content = renderToString(
        <Provider store={ store }>
        <StaticRouter location={ req.path } context={ context }>
           <div> { renderRoutes(Routes) }</div>
        </StaticRouter>
     </Provider>
    ); // рендерит не в dom, а в строку, которую express будет выдавать как html

    return `
    <!DOCTYPE html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Spa to Ssr</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" type="text/css" href="/${assetsByChunkName.main[0]}" />
    </head>
    <body>
        <div id="root">${content}</div>
        <script>
            window.__PRELOADED_STATE__=${serialize(store.getState()).replace(/</g, '\\u003c')}
        </script>
    <script src="/${assetsByChunkName.main[1]}"></script>
    </body>
</html>`;
};

app.get('*', (req, res) => {
    const params = req.params[0].split('/');
    const id = params[2];
    console.log(req, res);
    const routes = matchRoutes(Routes, req.path);

    const promises = routes.map(item => {
            return item.route.loadData ? route.loadData(store, id) : null;
        })
        .map(promise => {
            console.log(promise);
            if (promise) {
                return new Promise((resolve, reject) => {
                    promise.then(resolve).catch(resolve)
                });
            }
            return null;
        });

    Promise.all(promises).then(() => {
        const context = {};
        const content = renderer(req, store, context);

        if (context.notFound) {
            res.status(404);
        }
        res.send(content);
    })
});

app.listen(5000, () => {
    console.log('port listening 5000');
})
