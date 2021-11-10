import React from "react";
import { Query, Mutation } from "react-apollo";
import { gql } from 'apollo-boost';

import CartIcon from './cart-icon.component';
import { GET_ITEMS_COUNT } from "../../graphql/resolvers";

const TOGGLE_CART_HIDDEN = gql`
    mutation ToggleCartHidden {
        toggleCartHidden @client
    }
`;

const CartIconContainer = () => {
    return(
        <Query query={GET_ITEMS_COUNT}>
            {
                ({ data: { cartItemsCount } }) => (
                    <Mutation mutation={ TOGGLE_CART_HIDDEN }>
                        {
                            toggleCartHidden => (
                                <CartIcon 
                                    toggleCartHidden={ toggleCartHidden }
                                    itemCount={ cartItemsCount }         
                                />
                            )
                        }
                    </Mutation>
                )
            }
        </Query>
    );
};

export default CartIconContainer;