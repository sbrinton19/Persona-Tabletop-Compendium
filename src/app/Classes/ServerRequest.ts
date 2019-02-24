export enum ServerRequestType {
    Add,
    Get,
    Delete
}

export class ServerRequest {
    private readonly requestType: ServerRequestType;
    private readonly className: string;
    private readonly requestData: any;

    public constructor(requestType: ServerRequestType, className: string, requestData: any) {
        this.requestType = requestType;
        this.className = className;
        this.requestData = requestData;
    }

    public toString(): string {
        return `${ServerRequestType[this.requestType]}|${this.className}|${JSON.stringify(this.requestData)}`;
    }
}
