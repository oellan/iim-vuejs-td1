import {hashCode} from '@/utils/StringUtils.js';

export default class Task {

    /**
     * @param {string} taskName
     * @param {boolean} isFinished
     */
    constructor(taskName, isFinished) {
        this.hashId = hashCode(taskName)
        this.taskName = taskName;
        this.isFinished = isFinished;
    }

    /**
     *
     * @param {object} maybeTask
     * @returns {boolean}
     */
    static looksLikeMe(maybeTask) {
        return Object.prototype.hasOwnProperty.call(maybeTask, 'taskName')
            && Object.prototype.hasOwnProperty.call(maybeTask, 'isFinished');
    }
}
