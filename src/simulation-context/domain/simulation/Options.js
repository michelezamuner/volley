module.exports = class Options {
    /**
     * @param {null|Number} ballMass 
     * @param {null|Number} ballElasticity 
     * @param {null|Number} ballPosition 
     * @param {null|Number} floorPosition 
     * @param {null|Number} airViscosity 
     */
    constructor(ballMass, ballElasticity, ballPosition, floorPosition, airViscosity) {
        this._ballMass = ballMass;
        this._ballElasticity = ballElasticity;
        this._ballPosition = ballPosition;
        this._floorPosition = floorPosition;
        this._airViscosity = airViscosity;
    }

    /**
     * @return {null|Number}
     */
    getBallMass() {
        return this._ballMass;
    }

    /**
     * @return {null|Number}
     */
    getBallElasticity() {
        return this._ballElasticity;
    }

    /**
     * @return {null|Number}
     */
    getBallPosition() {
        return this._ballPosition;
    }

    /**
     * @return {null|Number}
     */
    getFloorPosition() {
        return this._floorPosition;
    }

    /**
     * @return {null|Number}
     */
    getAirViscosity() {
        return this._airViscosity;
    }
};