export class jobinfoForm {
    constructor (
        public jobTitle: string,
        public jobDescription: string,
        public startTime: Date,
        public expirTime: Date,
        public location: string,
        public comment: string
    ){ }
}