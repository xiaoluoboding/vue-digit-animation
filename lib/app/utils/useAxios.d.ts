import { AxiosRequestConfig } from 'axios';
interface AxiosOptions {
    debounce?: number;
    throttle?: number;
}
declare const useAxios: (url: string, config?: AxiosRequestConfig | undefined, options?: AxiosOptions | undefined) => {
    refetch: () => void;
    cancel: (message?: string | undefined) => void;
    response: import("vue").Ref<{
        data: any;
        status: number;
        statusText: string;
        headers: any;
        config: {
            url?: string | undefined;
            method?: "head" | "get" | "GET" | "delete" | "DELETE" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK" | undefined;
            baseURL?: string | undefined;
            transformRequest?: import("axios").AxiosTransformer | import("axios").AxiosTransformer[] | undefined;
            transformResponse?: import("axios").AxiosTransformer | import("axios").AxiosTransformer[] | undefined;
            headers?: any;
            params?: any;
            paramsSerializer?: ((params: any) => string) | undefined;
            data?: any;
            timeout?: number | undefined;
            timeoutErrorMessage?: string | undefined;
            withCredentials?: boolean | undefined;
            adapter?: import("axios").AxiosAdapter | undefined;
            auth?: {
                username: string;
                password: string;
            } | undefined;
            responseType?: "arraybuffer" | "blob" | "document" | "json" | "text" | "stream" | undefined;
            xsrfCookieName?: string | undefined;
            xsrfHeaderName?: string | undefined;
            onUploadProgress?: ((progressEvent: any) => void) | undefined;
            onDownloadProgress?: ((progressEvent: any) => void) | undefined;
            maxContentLength?: number | undefined;
            validateStatus?: ((status: number) => boolean) | null | undefined;
            maxBodyLength?: number | undefined;
            maxRedirects?: number | undefined;
            socketPath?: string | null | undefined;
            httpAgent?: any;
            httpsAgent?: any;
            proxy?: false | {
                host: string;
                port: number;
                auth?: {
                    username: string;
                    password: string;
                } | undefined;
                protocol?: string | undefined;
            } | undefined;
            cancelToken?: {
                promise: {
                    then: <TResult1 = import("axios").Cancel, TResult2 = never>(onfulfilled?: ((value: import("axios").Cancel) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined) => Promise<TResult1 | TResult2>;
                    catch: <TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined) => Promise<import("axios").Cancel | TResult>;
                    finally: (onfinally?: (() => void) | null | undefined) => Promise<import("axios").Cancel>;
                } & {
                    [Symbol.toStringTag]: string;
                };
                reason?: {
                    message: string;
                } | undefined;
                throwIfRequested: () => void;
            } | undefined;
            decompress?: boolean | undefined;
        };
        request?: any;
    } | null>;
    data: import("vue").Ref<object & {}>;
    finished: import("vue").Ref<boolean>;
    canceled: import("vue").Ref<boolean>;
    error: import("vue").Ref<{
        config: {
            url?: string | undefined;
            method?: "head" | "get" | "GET" | "delete" | "DELETE" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK" | undefined;
            baseURL?: string | undefined;
            transformRequest?: import("axios").AxiosTransformer | import("axios").AxiosTransformer[] | undefined;
            transformResponse?: import("axios").AxiosTransformer | import("axios").AxiosTransformer[] | undefined;
            headers?: any;
            params?: any;
            paramsSerializer?: ((params: any) => string) | undefined;
            data?: any;
            timeout?: number | undefined;
            timeoutErrorMessage?: string | undefined;
            withCredentials?: boolean | undefined;
            adapter?: import("axios").AxiosAdapter | undefined;
            auth?: {
                username: string;
                password: string;
            } | undefined;
            responseType?: "arraybuffer" | "blob" | "document" | "json" | "text" | "stream" | undefined;
            xsrfCookieName?: string | undefined;
            xsrfHeaderName?: string | undefined;
            onUploadProgress?: ((progressEvent: any) => void) | undefined;
            onDownloadProgress?: ((progressEvent: any) => void) | undefined;
            maxContentLength?: number | undefined;
            validateStatus?: ((status: number) => boolean) | null | undefined;
            maxBodyLength?: number | undefined;
            maxRedirects?: number | undefined;
            socketPath?: string | null | undefined;
            httpAgent?: any;
            httpsAgent?: any;
            proxy?: false | {
                host: string;
                port: number;
                auth?: {
                    username: string;
                    password: string;
                } | undefined;
                protocol?: string | undefined;
            } | undefined;
            cancelToken?: {
                promise: {
                    then: <TResult1 = import("axios").Cancel, TResult2 = never>(onfulfilled?: ((value: import("axios").Cancel) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined) => Promise<TResult1 | TResult2>;
                    catch: <TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined) => Promise<import("axios").Cancel | TResult>;
                    finally: (onfinally?: (() => void) | null | undefined) => Promise<import("axios").Cancel>;
                } & {
                    [Symbol.toStringTag]: string;
                };
                reason?: {
                    message: string;
                } | undefined;
                throwIfRequested: () => void;
            } | undefined;
            decompress?: boolean | undefined;
        };
        code?: string | undefined;
        request?: any;
        response?: {
            data: any;
            status: number;
            statusText: string;
            headers: any;
            config: {
                url?: string | undefined;
                method?: "head" | "get" | "GET" | "delete" | "DELETE" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK" | undefined;
                baseURL?: string | undefined;
                transformRequest?: import("axios").AxiosTransformer | import("axios").AxiosTransformer[] | undefined;
                transformResponse?: import("axios").AxiosTransformer | import("axios").AxiosTransformer[] | undefined;
                headers?: any;
                params?: any;
                paramsSerializer?: ((params: any) => string) | undefined;
                data?: any;
                timeout?: number | undefined;
                timeoutErrorMessage?: string | undefined;
                withCredentials?: boolean | undefined;
                adapter?: import("axios").AxiosAdapter | undefined;
                auth?: {
                    username: string;
                    password: string;
                } | undefined;
                responseType?: "arraybuffer" | "blob" | "document" | "json" | "text" | "stream" | undefined;
                xsrfCookieName?: string | undefined;
                xsrfHeaderName?: string | undefined;
                onUploadProgress?: ((progressEvent: any) => void) | undefined;
                onDownloadProgress?: ((progressEvent: any) => void) | undefined;
                maxContentLength?: number | undefined;
                validateStatus?: ((status: number) => boolean) | null | undefined;
                maxBodyLength?: number | undefined;
                maxRedirects?: number | undefined;
                socketPath?: string | null | undefined;
                httpAgent?: any;
                httpsAgent?: any;
                proxy?: false | {
                    host: string;
                    port: number;
                    auth?: {
                        username: string;
                        password: string;
                    } | undefined;
                    protocol?: string | undefined;
                } | undefined;
                cancelToken?: {
                    promise: {
                        then: <TResult1 = import("axios").Cancel, TResult2 = never>(onfulfilled?: ((value: import("axios").Cancel) => TResult1 | PromiseLike<TResult1>) | null | undefined, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | null | undefined) => Promise<TResult1 | TResult2>;
                        catch: <TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | null | undefined) => Promise<import("axios").Cancel | TResult>;
                        finally: (onfinally?: (() => void) | null | undefined) => Promise<import("axios").Cancel>;
                    } & {
                        [Symbol.toStringTag]: string;
                    };
                    reason?: {
                        message: string;
                    } | undefined;
                    throwIfRequested: () => void;
                } | undefined;
                decompress?: boolean | undefined;
            };
            request?: any;
        } | undefined;
        isAxiosError: boolean;
        toJSON: () => object;
        name: string;
        message: string;
        stack?: string | undefined;
    } | null>;
};
export { useAxios };
//# sourceMappingURL=useAxios.d.ts.map