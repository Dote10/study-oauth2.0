import { Injectable, Request, Query } from '@nestjs/common';
import { google } from 'googleapis';
import axios from 'axios';
import { EndpointServiceClient } from '@google-cloud/aiplatform';
import httpServer from 'http-server';
import url from 'url';
import opnee from 'open';
import destroyer from 'server-destroy';
import { Http2ServerRequest, createServer } from 'http2';
import * as handlebars from 'hbs';
import * as request from 'supertest';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class UsersService {
  async createToken() {
    const scopes = ['https://www.googleapis.com/auth/androidpublisher'];
    // const scopes =
    //   'https://people.googleapis.com/v1/people/me?personFields=names';
    const oauth2Client = new google.auth.OAuth2(
      '',
      '',
      //'https://ten-88db9.firebaseapp.com/__/auth/handler',
      //'https://www.googleapis.com/auth/androidpublisher',
      'http://localhost:5000/payments/oauthcallback',
      //'http://localhost:5000/users/oauthcallback',
    );

    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes,
    });

    console.log(authUrl);

    // const readHeader = await oauth2Client.getRequestHeaders(authUrl);

    // const result = await axios({
    //   url: authUrl,
    //   method: 'get',
    // });

    // const result = await new Promise(async (resolve, reject) => {
    //   const re = await fetch(authUrl, {
    //     method: 'get',
    //     redirect: 'follow',
    //   }).then(async (data) => await data);
    //   resolve(re);
    // });

    // const tokens = await oauth2Client.generateCodeVerifierAsync();
    // Now tokens contains an access_token and an optional refresh_token. Save them.

    // const { tokens } = await oauth2Client.getToken(

    // oauth2Client.setCredentials(tokens);

    // oauth2Client.on('tokens', (tokens) => {
    //   if (tokens.refresh_token) {
    //     // store the refresh_token in my database!
    //     console.log(tokens.refresh_token);
    //   }
    //   console.log(tokens.access_token);
    // });
  }

  async opne2(authUrl) {
    return await axios({ url: authUrl, method: 'post' });
  }

  async createToken2() {
    // const auth = new google.auth.GoogleAuth({
    //   clientId: '',
    //   clientSecret: '',
    //   redirectUri: '',
    // });
    // const androidpublisher = google.androidpublisher({
    //   auth,
    //   version: 'v3',
    // });
    // const res = await androidpublisher.purchases.products.get({
    //   packageName: '',
    //   productId: '',
    //   token:
    //     '',
    // });
    // return res;
  }

  // async main() {
  //   const oAuth2Client = await this.getAuthenticatedClient();
  //   // Make a simple request to the People API using our pre-authenticated client. The `request()` method
  //   // takes an GaxiosOptions object.  Visit https://github.com/JustinBeckwith/gaxios.
  //   const url = 'https://people.googleapis.com/v1/people/me?personFields=names';
  //   const res = await oAuth2Client.request({ url });
  //   console.log(res.data);

  //   // After acquiring an access_token, you may want to check on the audience, expiration,
  //   // or original scopes requested.  You can do that with the `getTokenInfo` method.
  //   const tokenInfo = await oAuth2Client.getTokenInfo(
  //     oAuth2Client.credentials.access_token,
  //   );
  //   console.log(tokenInfo);
  // }

  async getCode(res, accessToken) {
    return await res.status(200).json({ accessToken });
  }

  async createToken4(code) {
    const oauth2Client = new google.auth.OAuth2(
      '',
      '',
      //'https://ten-88db9.firebaseapp.com/__/auth/handler',
      //'https://www.googleapis.com/auth/androidpublisher',
      'http://localhost:5000/payments/oauthcallback',
      //'http://localhost:5000/users/oauthcallback',
    );

    // const search = originUrl.split('?')[1];

    // const urlSearch = new URLSearchParams(search);

    // const code = urlSearch.get('code');

    // Get access and refresh tokens (if access_type is offline)

    // const { tokens } = await oauth2Client.getToken(code);
    // oauth2Client.setCredentials(tokens);

    const { access_token } = await this.getTokenByRefreshToken();
    oauth2Client.setCredentials(access_token);

    console.log(access_token);
    const androidpublisher = google.androidpublisher({
      auth: oauth2Client,
      version: 'v3',
    });

    const res = await androidpublisher.purchases.products.get({
      packageName: '',
      productId: '',
      token: '',
    });

    console.log(res.data);
    return res.data;
  }

  async getProfileInfo() {
    const people = google.people('v1');
    const res = await people.people.get({
      resourceName: 'people/me',
      personFields: 'emailAddresses',
    });
    console.log(res.data);
  }

  async getTokenByRefreshToken() {
    const res = await axios({
      url: 'https://accounts.google.com/o/oauth2/token',
      method: 'post',
      data: {
        refresh_token: '',
        client_id: '',
        client_secret: '',
        grant_type: 'refresh_token',
      },
    });

    return res.data;
  }
}
