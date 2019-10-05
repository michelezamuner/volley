/**
 * @package Time
 */
module.exports = class SimpleTime {
    /**
     * @return {number}
     */
    now() {
        const timeData = process.hrtime();

        return timeData[0] + timeData[1] / 1000000000;
    }
};