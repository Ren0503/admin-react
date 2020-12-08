import fakeRestProvider from 'ra-data-fakerest';
import { cacheDataProviderProxy } from 'react-admin';
import simpleRestProvider from 'ra-data-simple-rest';

import data from './data';
import addUploadFeature from '../helper/addUploadFeature';
/*
const dataProvider = simpleRestProvider(data);
const myDataProvider = {
    ...dataProvider,
    update: (resource, params) => {
        if(resource !== 'recipes' || !params.data.pictures) {
            return dataProvider.update(resource, params);
        }

        // Freshly dropped pictures are File objects and must be converted to base64 strings
        const newPictures = params.data.pictures.filter(
            p => p.rawFile instanceof File
        );
        const formerPictures = params.data.pictures.filter(
            p => !(p.rawFile instanceof File)
        );

        return Promise.all(newPictures.map(convertFileToBase64))
            .then(base64Pictures => 
                base64Pictures.map(picture64 => ({
                    src: picture64,
                    title: `${params.data.title}`,
                }))
            )
            .then(tranformedNewPictures => 
                dataProvider.update(resource, {
                    ...params,
                    data : {
                        ...params.data,
                        pictures: [
                            ...tranformedNewPictures,
                            ...formerPictures,
                        ],
                    },
                })
            );
    },
};

const convertFileToBase64 = file => 
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(file.rawFile);
    });

export default myDataProvider;

*/
const dataProvider = fakeRestProvider(data);
const uploadCapableDataProvider = addUploadFeature(dataProvider);
const sometimesFailsDataProvider = new Proxy(uploadCapableDataProvider, {
    get: (target, name) => (resource, params) => {
        // add rejection by type or resource here for tests, e.g.
        // if (name === 'delete' && resource === 'recipes') {
        //     return Promise.reject(new Error('deletion error'));
        // }
        if (
            resource === 'recipes' &&
            params.data &&
            params.data.title === 'f00bar'
        ) {
            return Promise.reject(new Error('this title cannot be used'));
        }
        return uploadCapableDataProvider[name](resource, params);
    },
});
const delayedDataProvider = new Proxy(sometimesFailsDataProvider, {
    get: (target, name) => (resource, params) =>
        new Promise(resolve =>
            setTimeout(
                () =>
                    resolve(sometimesFailsDataProvider[name](resource, params)),
                300
            )
        ),
});

export default cacheDataProviderProxy(delayedDataProvider);
