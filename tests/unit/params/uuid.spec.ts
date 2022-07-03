import { match } from '../../../src/params/uuid'

describe('UUID parameter matcher', () => {
    test('should not match an invalid UUID', () => {
        expect(match('not-a-uuid')).toBeFalsy();
    });
    describe('should match valid UUIDs', () => {
        test('should match an uppercase, un-hypenated UUID', () => {
            expect(match('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')).toBeTruthy();
        });
        test('should match an uppercase, hypenated UUID', () => {
            expect(match('AAAAAAAA-AAAA-AAAA-AAAA-AAAAAAAAAAAA')).toBeTruthy();
        });
        test('should match a lowercase, un-hypenated UUID', () => {
            expect(match('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')).toBeTruthy();
        });
        test('should match a lowercase, hypenated UUID', () => {
            expect(match('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa')).toBeTruthy();
        });
    });
});