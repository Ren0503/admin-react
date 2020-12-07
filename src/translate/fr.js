import frenchMessages from 'ra-language-french';

export default {
    simple: {
        action: {
            close: 'Fermer',
            resetViews: 'Réinitialiser des vues',
        },
        'create-recipe': 'Nouveau recettes',
    },
    ...frenchMessages,
    resources: {
        recipes: {
            name: 'Recettes |||| Recettes',
            fields: {
                rate: 'Taux',
                body: 'Contenu',
                reviews : 'Revues',
                accepted: 'Accepté',
                created_at: 'Créé le',
                notifications: 'Destinataires de notifications',
                nb_view: 'Nb de vues',
                password: 'Mot de passe (si protégé)',
                pictures: 'Photos associées',
                published_at: 'Publié le',
                desc: 'Description',
                tags: 'Catégories',
                title: 'Titre',
                views: 'Vues',
                authors: 'Auteurs',
            },
        },
        reviews: {
            name: 'Revue |||| Revues',
            fields: {
                body: 'Contenu',
                created_at: 'Créé le',
                recipe_id: 'Recettes',
                author: {
                    name: 'Auteur',
                },
            },
        },
        users: {
            name: 'User |||| Users',
            fields: {
                username: 'Name',
                role: 'Role',
            },
        },
    },
    recipe: {
        list: {
            search: 'Recherche',
        },
        form: {
            summary: 'Résumé',
            body: 'Contenu',
            miscellaneous: 'Extra',
            revues: 'Revues',
        },
        edit: {
            title: 'Recettes "%{title}"',
        },
    },
    review: {
        list: {
            about: 'Au sujet de',
        },
    },
    user: {
        list: {
            search: 'Recherche',
        },
        form: {
            summary: 'Résumé',
            security: 'Sécurité',
        },
        edit: {
            title: 'Utilisateur "%{title}"',
        },
    },
};