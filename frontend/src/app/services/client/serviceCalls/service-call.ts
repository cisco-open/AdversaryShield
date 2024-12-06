import { HttpParams } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

export type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH';

export abstract class ServiceCall<Response> {
	protected method: HttpMethod;
	protected url: string;
	protected params?: HttpParams;
	protected body?: any;
	protected options: any = {};

	public get getMethod() {
		return this.method;
	}
	public get getUrl() {
		return this.url;
	}
	public get getParams() {
		return this.params;
	}
	public get getBody() {
		return this.body;
	}

	public get getOptions() {
		return this.options;
	}

	protected constructor(method: HttpMethod, url: string, params?: HttpParams, options?: any) {
		this.method = method;
		this.params = params;
		this.options = options || {};

		this.url = `${environment.backendBaseUrl}/${environment.apiUrl}/${url}`;
	}
}

export abstract class ServiceCallGET<Response> extends ServiceCall<Response> {
	protected constructor(url: string, params?: HttpParams, options?: any) {
		let newParams = new HttpParams();
		if (params) {
			newParams = params;
		}
		super('GET', url, newParams, options);
	}
}

export abstract class ServiceCallPOST<Response> extends ServiceCall<Response> {
	protected constructor(url: string, body: Object) {
		super('POST', url);
		this.body = body;
	}
}

export abstract class ServiceCallPUT extends ServiceCall<Response> {
	protected constructor(url: string, body: Object) {
		super('PUT', url);
		this.body = body;
	}
}

export abstract class ServiceCallDELETE extends ServiceCall<Response> {
	protected constructor(url: string, params?: HttpParams, options?: any) {
		let newParams = new HttpParams();
		if (params) {
			newParams = params;
		}
		super('DELETE', url, newParams, options);
	}
}
