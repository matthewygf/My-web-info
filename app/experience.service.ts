import { Injectable } from '@angular/core';

import { WorkExperience } from './work-experience';
import { workExperiences } from './mock-work-experience';

@Injectable()
export class ExperienceService {
    getExperiences() {
        return Promise.resolve(workExperiences);
    }
    // See the "Take it slow" appendix
    //getHeroesSlowly() {
    //    return new Promise<Hero[]>(resolve =>
    //        setTimeout(() => resolve(HEROES), 2000) // 2 seconds
    //    );
    //}
}

