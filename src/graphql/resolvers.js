import { gql } from 'apollo-boost';

import {
    addItemToCart,
    getCartItemsCount,
    getCartItemsTotal
} from './cart.utils';

export const typeDefs = gql`
    extend type Item {
        quantity: Int
    }
    
    extend type Mutation {
        ToggleCartHidden: Boolean!
        AddItemToCart(item: Item!): [Item]!
        SetCurrentUser(user: User!): User!
    }

    extend type User {
        id: ID!
        displayName: String!
        email: String!
        createdAt: String!
    }
`;

export const GET_CART_HIDDEN = gql`
    {
        cartHidden @client
    }
`;

export const GET_CART_ITEMS = gql`
    {
        cartItems @client
    }
`;

export const GET_ITEMS_COUNT = gql`
    {
        cartItemsCount @client
    }
`;

export const GET_CART_TOTAL = gql`
    {
        cartItemsTotal @client
    }
`;

export const GET_CURRENT_USER = gql`
    {
        currentUser @client
    }
`;

export const resolvers = {
    Mutation: {
        toggleCartHidden: (_root, _args, { cache }) => {
            const { cartHidden } = cache.readQuery({
                query: GET_CART_HIDDEN
            });

            cache.writeQuery({
                query: GET_CART_HIDDEN,
                data: { cartHidden: !cartHidden }
            });

            return !cartHidden;
        },

        addItemToCart: (_root, { item }, { cache }) => {
            const { cartItems } = cache.readQuery({
                query: GET_CART_ITEMS
            });

            const newCartItems = addItemToCart(cartItems, item);

            cache.writeQuery({
                query: GET_ITEMS_COUNT,
                data: { cartItemsCount: getCartItemsCount(newCartItems) }
            });

            cache.writeQuery({
                query: GET_CART_TOTAL,
                data: { cartItemsTotal: getCartItemsTotal(newCartItems) }
            });

            cache.writeQuery({
                query: GET_CART_ITEMS,
                data: { cartItems: newCartItems }
            });

            return newCartItems;
        },

        setCurrentUser: (_root, { user }, { cache }) => {
            cache.writeQuery({
                query: GET_CURRENT_USER,
                data: { currentUser: user }
            });

            return user;
        }
    }
};