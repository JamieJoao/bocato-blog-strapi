import type { Schema, Attribute } from '@strapi/strapi';

export interface AboutUsFavoriteRecipe extends Schema.Component {
  collectionName: 'components_about_us_favorite_recipes';
  info: {
    displayName: 'Favorite Recipe';
    icon: 'apps';
  };
  attributes: {
    image: Attribute.Media;
    title: Attribute.String;
    subtitle: Attribute.String;
    description: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'about-us.favorite-recipe': AboutUsFavoriteRecipe;
    }
  }
}
