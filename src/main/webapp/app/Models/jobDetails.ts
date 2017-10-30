export class JobDetails {
    constructor(
        public jobID: string,
        public jobTitle: string,
        public jobDescription: string,
        public company: string,
        public requiredSkills: Array<string>,
        public createdTime: Date,
        public startTime: Date,
        public expirTime: Date,
        public location: string,
        public categories: string,
        public comments: Comment
    ) {}
}

