export class jobDetails {
    constructor(
        public jobId: string,
        public jobTittle: string,
        public jobDescription: string,
        public company: string,
        public requiredSkills: Array<string>,
        public createdTime: Date,
        public startTime: Date,
        public expirTime: Date,
        public location: string,
        public categories: string,
        public comments: Array<Comment>
    ) {}
}

