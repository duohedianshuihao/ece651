"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jobDetails = (function () {
    function jobDetails(jobId, jobTittle, jobDescription, company, requiredSkills, createdTime, startTime, expirTime, location, categories, comments) {
        this.jobId = jobId;
        this.jobTittle = jobTittle;
        this.jobDescription = jobDescription;
        this.company = company;
        this.requiredSkills = requiredSkills;
        this.createdTime = createdTime;
        this.startTime = startTime;
        this.expirTime = expirTime;
        this.location = location;
        this.categories = categories;
        this.comments = comments;
    }
    return jobDetails;
}());
exports.jobDetails = jobDetails;
//# sourceMappingURL=jobDetails.js.map