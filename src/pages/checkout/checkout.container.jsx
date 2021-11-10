import React from "react";
import { Query } from "@apollo/react-components";

import CheckoutPage from './checkout.component';
import {
    GET_CART_ITEMS,
    GET_CART_TOTAL
} from "../../graphql/resolvers";

const CheckoutPageContainer = () => {
    return (
        <Query query={ GET_CART_ITEMS }>
            {
                ({ data: { cartItems } }) => (
                    <Query query={ GET_CART_TOTAL }>
                        {
                            ({ data: { cartItemsTotal } }) => (
                                <CheckoutPage
                                    cartItems={ cartItems } 
                                    total={ cartItemsTotal }
                                />
                            )
                        }
                    </Query>
                )
            }
        </Query>
    );
};

export default CheckoutPageContainer;