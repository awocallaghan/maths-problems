'use strict';
import assert from 'assert';
import should from 'should';

import {
    models,
    generator,
    marker
} from './../src/problems';

import { _models } from './../src/problems/models';
import { _generator } from './../src/problems/generator';
import { _marker } from './../src/problems/marker';

describe('problems', () => {
    it('should export `models`', () => {
        models.should.not.equal(null);
        (typeof models).should.not.equal('undefined');
        models.should.deepEqual(_models);
    });
    it('should export `generator`', () => {
        generator.should.not.equal(null);
        (typeof generator).should.not.equal('undefined');
        generator.should.deepEqual(_generator);
    });
    it('should export `marker`', () => {
        marker.should.not.equal(null);
        (typeof marker).should.not.equal('undefined');
        marker.should.deepEqual(_marker);
    });
});