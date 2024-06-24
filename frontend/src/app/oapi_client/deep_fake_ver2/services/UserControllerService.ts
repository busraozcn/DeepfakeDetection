/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { User } from '../models/User';
import type { UserRequestBody } from '../models/UserRequestBody';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class UserControllerService {
    constructor(public readonly http: HttpClient) {}
    /**
     * @param token
     * @param newPassword
     * @returns string OK
     * @throws ApiError
     */
    public resetPassword(
        token: string,
        newPassword: string,
    ): Observable<string> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/users/reset-password',
            query: {
                'token': token,
                'newPassword': newPassword,
            },
        });
    }
    /**
     * @param email
     * @returns string OK
     * @throws ApiError
     */
    public resetPasswordRequest(
        email: string,
    ): Observable<string> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/users/reset-password-request',
            query: {
                'email': email,
            },
        });
    }
    /**
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public registerUser(
        requestBody: User,
    ): Observable<string> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/users/register',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public loginUser(
        requestBody: UserRequestBody,
    ): Observable<string> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/api/users/login',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
