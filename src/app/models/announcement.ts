import { Time } from '@angular/common';

export interface Announcement {
    subject: string,
    category: string,
    description: String,
    companyId: String,
    userId: String,
    notify: String,
    date?: Date,
    time?: Time,
    location?: string
}