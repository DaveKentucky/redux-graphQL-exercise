import React from "react";
import { Mutation, Query } from "@apollo/react-components";
import { gql } from 'apollo-boost';

import App from "./App";
import { GET_CURRENT_USER } from "../graphql/resolvers";

const SET_CURRENT_USER = gql`
  mutation SetCurrentUser($user: User!) {
    setCurrentUser(user: $user) @client
  }
`;

const AppContainer = () => {
    return(
        <Query query={ GET_CURRENT_USER }>
            {
            ({ data: { currentUser } }) => (
                <Mutation mutation={ SET_CURRENT_USER }>
                    {
                        (setCurrentUser) => (
                            <App 
                                currentUser={ currentUser }
                                setCurrentUser={(user) => (
                                    setCurrentUser({ variables: { user } })
                                )}
                            />
                        )
                    }
                </Mutation>
                
            )
            }
        </Query>
    );
};

export default AppContainer;