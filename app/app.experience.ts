import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';

import { WorkExperience } from './work-experience';
import { ExperienceService } from './experience.service';

@Component({
    selector: 'experience',
    templateUrl: 'app/experience.html',
    providers: [ExperienceService, NgClass]
})

export class Experience implements OnInit {
    title = 'Experience';
    experiences: WorkExperience[];
    currentMonth = new Date().getUTCMonth();
    currentYear = new Date().getUTCFullYear();

    constructor(private experienceService: ExperienceService) { }

    getExperiences() {
        this.experienceService.getExperiences()
                              .then(experiences => this.experiences = experiences);
    }

    ngOnInit() {
        this.getExperiences();
    }
}
