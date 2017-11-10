export class jobDetails {
    constructor(
        public jobId: string,
        public jobTittle: string,
        public jobDescription: string,
        public company: any,
        public requiredSkills: Array<string>,
        public createdTime: Date,
        public startTime: Date,
        public expirTime: Date,
        public location: string,
        public categories: string,
        public comments: Array<any>
    ) {}
}

