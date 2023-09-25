import { InvalidUuidError, Uuid } from "../uuid.vo"
import { validate as validateUuid } from 'uuid';

describe("Uuid Unit Tests", () => {
    const validateSpy = jest.spyOn(Uuid.prototype as any, "validate");

    test("should throw error when uuid is invalid", () => {
        expect(() => {
            new Uuid("invalid-uuid");
        }).toThrowError(new InvalidUuidError());
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test("should create a valid uuid", () => {
        const uuid = new Uuid();
        expect(uuid.id).toBeDefined();
        expect(validateUuid(uuid.id)).toBeTruthy();
        expect(validateSpy).toHaveBeenCalledTimes(1);
    });

    test("should accept a valid uuid", () => {
        const uuid = new Uuid("22ca867e-f3f0-4ebe-8751-0b1860e8b558");
        expect(uuid.id).toBe("22ca867e-f3f0-4ebe-8751-0b1860e8b558");
        expect(validateSpy).toHaveBeenCalledTimes(1);
    })
})