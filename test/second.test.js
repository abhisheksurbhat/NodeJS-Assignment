"use strict";

require("babel-polyfill");

var _crawler = require("../crawler");

var chai = require('chai');

var chaiHttp = require('chai-http');

var expect = chai.expect;
chai.use(chaiHttp);
var website = {};
describe('Crawler program', function () {
  describe('getSiteData', function () {
    it('gets called', function () {
      var site = 'https://www.google.co.in';
      (0, _crawler.getSiteData)(site).then(function (res) {
        Object.assign(website, res);
        expect(res).to.exist;
      }).catch(function (err) {
        expect(err).to.exist;
      });
    });
  });
  describe('getLinkStatus', function () {
    it('returns right message', function () {
      var site = 'https://www.google.co.in/en';
      var domain = 'www.google.co.in';
      var response = (0, _crawler.getLinkStatus)(site, domain);
      expect(response).to.be.true;
    });
    it('displays approppriate error message', function () {
      var site = 'https://www.google.co.in/en';
      var domain = 'www.facebook.com';
      var response = (0, _crawler.getLinkStatus)(site, domain);
      expect(response).to.not.be.true;
    });
  });
  describe('isLinkClean', function () {
    it('returns right message', function () {
      var site = 'https://www.google.co.in/en';
      var domain = 'www.google.co.in';
      var response = (0, _crawler.isLinkClean)(site, domain);
      expect(response).to.be.true;
    });
    it('displays approppriate error message', function () {
      var site = 'https://www.google.co.in/en';
      var domain = 'www.facebook.com';
      var response = (0, _crawler.isLinkClean)(site, domain);
      expect(response).to.not.be.true;
    });
  });
  describe('getLinks', function () {
    it('returns a document map', function () {
      var tag = 'a';
      var website = {};
      (0, _crawler.getSiteData)('https://www.google.co.in').then(function (res) {
        Object.assign(website, res);
        (0, _crawler.getLinks)(website, tag).then(function (resp) {
          expect(resp).to.exist;
        }).catch(function (err) {
          expect(err).to.exist;
        });
      });
    });
  });
  describe('getOneLevelLinks', function () {
    it('returns correct output', function () {
      var site = 'https://www.google.co.in';
      var domain = 'www.google.co.in';
      (0, _crawler.getOneLevelLinks)(site, 0, domain).then(function (res) {
        expect(res).to.be.an('object');
      }).catch(function (err) {
        expect(err).to.exist;
      });
    });
    it('returns empty object on error', function () {
      var wrongSite = 'https://www.gogle.co.in';
      var domain = 'www.google.co.in';
      (0, _crawler.getOneLevelLinks)(wrongSite, 0, domain).catch(function (err) {
        expect(err).to.be.true;
      });
    });
  });
});
