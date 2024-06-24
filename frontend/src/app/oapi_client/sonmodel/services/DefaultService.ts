/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import type { Observable } from 'rxjs';
import type { Body_predict_predict__post } from '../models/Body_predict_predict__post';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
@Injectable({
    providedIn: 'root',
})
export class DefaultService {
    constructor(public readonly http: HttpClient) {}
    /**
     * Predict
     * @param formData
     * @returns any Successful Response
     * @throws ApiError
     */
    public predictPredictPost(
        formData: Body_predict_predict__post,
    ): Observable<any> {
        return __request(OpenAPI, this.http, {
            method: 'POST',
            url: '/predict/',
            formData: formData,
            mediaType: 'multipart/form-data',
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
