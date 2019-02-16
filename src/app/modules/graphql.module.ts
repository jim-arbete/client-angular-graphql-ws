import {NgModule} from '@angular/core';
import {HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ApolloModule, APOLLO_OPTIONS} from 'apollo-angular';
import {split} from 'apollo-link';
import {HttpLinkModule, HttpLink} from 'apollo-angular-link-http';
import {WebSocketLink} from 'apollo-link-ws';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {getMainDefinition} from 'apollo-utilities';

const uri = environment.API_HTTP_URL || 'http://localhost:4000/graphql';

export function createApollo(httpLink: HttpLink) {

  const http = httpLink.create({
    uri: uri
  });

  const auth = setContext((_, { headers = new HttpHeaders() }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');

    // return the headers to the context so httpLink can read them
    if (!token) {
      return {};
    } else {
      return {
        headers: headers.append('Authorization', `Bearer ${token}`)
      };
    }
  });

  const ws = new WebSocketLink({
    uri: environment.API_WS_URL || `ws://localhost:4000/graphql`,
    options: {
      reconnect: true,
      lazy: true,
      connectionParams: () => {
        const token = localStorage.getItem('token');
        if (!token) {
          return {};
        } else {
          return {
            authorization: `Bearer ${localStorage.getItem('token')}`,
          };
        }
      },
      connectionCallback: err => {
        if (err) {
          console.log('Error Connecting to Subscriptions Server', err);
        }
      },
    }
  });

  const link = split(
    ({ query }) => {
      const { kind, operation } = getMainDefinition(query);
      return kind === 'OperationDefinition' && operation === 'subscription';
    },
    ws,
    http
  );

  return {
    link: auth.concat(link),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  exports: [ApolloModule, HttpLinkModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [ HttpLink ],
    },
  ],
})
export class GraphQLModule {}
