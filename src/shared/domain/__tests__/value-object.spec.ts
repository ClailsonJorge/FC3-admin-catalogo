import { ValueObject } from "../value-object";

class StringValueObject extends ValueObject {
    constructor(readonly value: string) {
        super();
    }
}

class ComplexValueObject extends ValueObject {
    constructor(readonly prop1: string, readonly prop2: number) {
        super();
    }
}

describe("Value Object Unit Tests", () => {
    test("should be equals", () => {
        const vo1 = new StringValueObject("test");
        const vo2 = new StringValueObject("test");

        expect(vo2.equals(vo1)).toBeTruthy();

        const complexVo1 = new ComplexValueObject("test", 1);
        const complexVo2 = new ComplexValueObject("test", 1);

        expect(complexVo1.equals(complexVo2)).toBeTruthy();
    });

    test("should not be equals", () => {
        const vo1 = new StringValueObject("test");
        const vo2 = new StringValueObject("test1");

        expect(vo2.equals(vo1)).toBeFalsy();
        expect(vo2.equals(null as any)).toBeFalsy();
        expect(vo1.equals(undefined as any)).toBeFalsy();

        const complexVo1 = new ComplexValueObject("test", 2);
        const complexVo2 = new ComplexValueObject("test1", 1);

        expect(complexVo1.equals(complexVo2)).toBeFalsy();
        expect(complexVo1.equals(null as any)).toBeFalsy();
        expect(complexVo2.equals(undefined as any)).toBeFalsy();
    })
})