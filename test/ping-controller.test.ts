import * as mocha from 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import app from '../src/App';

chai.use(chaiHttp);
const expect = chai.expect;

describe('ping controller', () => {

    it('responds 200 with JSON', () => {
        return chai.request(app).get('/ping')
            .then(res => {
                expect(res.status).to.equal(200);
                expect(res).to.be.json;
            });
    });

    it('should be alive', () => {
        return chai.request(app).get('/ping')
            .then(res => {
                let status = res.body.status;
                expect(status).to.exist;
                expect(status).to.equal("alive");
            });
    });
});