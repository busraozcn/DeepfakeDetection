/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { FileData } from '../models/FileData';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class ImageControllerService {
    constructor(public readonly http: HttpClient) {}
    /**
     * @param userId
     * @param requestBody
     * @returns string OK
     * @throws ApiError
     */
    public uploadImage(
        userId: number,
        requestBody?: {
            image: Blob;
        },
    ): Observable<string> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/image/upload',
            query: {
                'userId': userId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @param userId
     * @returns FileData OK
     * @throws ApiError
     */
    public listImagesByUser(
        userId: number,
    ): Observable<Array<FileData>> {
        return __request(OpenAPI, this.http, {
            method: 'GET',
            url: '/image/list/{userId}',
            path: {
                'userId': userId,
            },
        });
    }
}
