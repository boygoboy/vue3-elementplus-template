import * as axios from 'axios';

declare module 'axios'{
    export interface AxiosResponse<T=any>{
        code:number;
        message:string;
        data:T;
    }
}