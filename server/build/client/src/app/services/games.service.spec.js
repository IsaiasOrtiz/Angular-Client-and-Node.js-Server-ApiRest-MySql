"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@angular/core/testing");
const games_service_1 = require("./games.service");
describe('GamesService', () => {
    let service;
    beforeEach(() => {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(games_service_1.GamesService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
