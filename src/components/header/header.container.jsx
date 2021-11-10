import React from "react";
import { Query } from 'react-apollo';

import Header from "./header.component";
import {
    GET_CART_HIDDEN,
    GET_CURRENT_USER
} from '../../graphql/resolvers';


const HeaderContainer = () => {
    return(
        <Query query={ GET_CART_HIDDEN }>
            {
                ({ data: { cartHidden } }) => (
                    <Query query={ GET_CURRENT_USER }>
                        {
                            ({ data: { currentUser } }) =>
                                <Header
                                    hidden={ cartHidden }
                                    currentUser={ currentUser }
                                />
                        }
                    </Query>
                )
            }
        </Query>
    );
};

export default HeaderContainer;