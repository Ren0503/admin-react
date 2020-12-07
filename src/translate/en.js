import englishMessages from 'ra-language-english';

export const messages = {
    simple: {
        action: {
            close: 'Close',
            resetViews: 'Reset views',
        },
        'create-recipe': 'New recipe',
    },
    ...englishMessages,
    resources: {
        recipes: {
            name: 'Recipe |||| Recipes',
            fields: {
                rate: 'Rate',
                body: 'Body',
                reviews: 'Reviews',
                accepted: 'Accepted',
                created_at: 'Created at',
                notifications: 'Notifications recipients',
                nb_view: 'Nb views',
                password: 'Password (if protected recipe)',
                pictures: 'Related Pictures',
                published_at: 'Published at',
                desc: 'Description',
                tags: 'Tags',
                title: 'Title',
                views: 'Views',
                authors: 'Authors',
            },
        },
        reviews: {
            name: 'Review |||| Reviews',
            fields: {
                body: 'Body',
                created_at: 'Created at',
                recipe_id: 'recipes',
                author: {
                    name: 'Author',
                },
            },
        },
        users: {
            name: 'User |||| Users',
            fields: {
                username: 'Username',
                role: 'Role',
                email: 'Email'
            },
        },
    },
    recipe: {
        list: {
            search: 'Search',
        },
        form: {
            summary: 'Summary',
            body: 'Body',
            miscellaneous: 'Miscellaneous',
            reviews: 'Reviews',
        },
        edit: {
            title: 'recipe "%{title}"',
        },
        action: {
            save_and_edit: 'Save and Edit',
            save_and_add: 'Save and Add',
            save_and_show: 'Save and Show',
            save_with_rate: 'Save with Rate',
        },
    },
    review: {
        list: {
            about: 'About',
        },
    },
    user: {
        list: {
            search: 'Search',
        },
        form: {
            summary: 'Summary',
            security: 'Security',
        },
        edit: {
            title: 'User "%{title}"',
        },
        action: {
            save_and_add: 'Save and Add',
            save_and_show: 'Save and Show',
        },
    },
};

export default messages;