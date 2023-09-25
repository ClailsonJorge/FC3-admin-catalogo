import { Uuid } from "../../../shared/domain/value-objects/uuid.vo";
import { Category } from "../category.entity";

describe("Category Unit Tests", () => {
    let validatorSpy: any 
    beforeEach(() => {
        validatorSpy = jest.spyOn(Category, "validate");
    })

    test("should test change name", () => {
        const category = Category.create({
            name: "any_name"
        });
        expect(category.name).toBe("any_name");

        category.changeName("other_name");
        expect(category.name).toBe("other_name");
        expect(validatorSpy).toHaveBeenCalledTimes(2);
    });
    test("should test change description", () => {
        const category = Category.create({
            name: "any_name",
            description: "any_description"
        });
        expect(category.name).toBe("any_name");
        expect(category.description).toBe("any_description");
        
        category.changeDescription("other_description");
        expect(category.description).toBe("other_description");
        expect(validatorSpy).toHaveBeenCalledTimes(2);
    });
    test("should test activate", () => {
        const category = Category.create({
            name: "any_name",
            is_active: false,
        });
        expect(category.name).toBe("any_name");
        expect(category.is_active).toBeFalsy();

        category.activate();
        expect(category.is_active).toBeTruthy();
        expect(validatorSpy).toHaveBeenCalledTimes(1);
    });
    test("should test desactive", () => {
        const category = Category.create({
            name: "any_name",
        });
        expect(category.name).toBe("any_name");
        expect(category.is_active).toBeTruthy();

        category.deactivate();
        expect(category.is_active).toBeFalsy();
        expect(validatorSpy).toHaveBeenCalledTimes(1);
    });
    test("should test toJSON", () => {
        const created_at = new Date();
        const category = new Category({
            name: "any_name",
            description: "any_description",
            is_active: true,
            created_at
        });
        expect(category.toJSON()).toMatchObject({
            description: "any_description",
            is_active: true,
            created_at,
            name: "any_name"
        })
    });


    describe("Constructor", () => {
        test("should be test constructor with name params", () => {
            const category = new Category({
                name: "Movie"
            })

            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe("Movie")
            expect(category.description).toBe(null);
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        })

        test("should be test constructor with default params", () => {
            const created_at = new Date();
            const category = new Category({
                name: "Movie",
                description: "any_description",
                is_active: false,
                created_at
            })

            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe("Movie")
            expect(category.description).toBe("any_description");
            expect(category.is_active).toBeFalsy();
            expect(category.created_at).toBe(created_at);
        })

        test("should be test constructor with name and description params", () => {
            const category = new Category({
                name: "Movie",
                description: "any_description",
            })

            expect(category.category_id).toBeInstanceOf(Uuid);
            expect(category.name).toBe("Movie")
            expect(category.description).toBe("any_description");
            expect(category.is_active).toBeTruthy();
            expect(category.created_at).toBeInstanceOf(Date);
        })
    });

    describe("Factory method", () => {
        test("Create a new category", () => {
            const created_at = new Date();
            const newCategory = Category.create({
                name: "any_name",
                description: "any_description",
                created_at,
                is_active: true
            });
            expect(newCategory).toBeInstanceOf(Category);
        });

        test("should create new category with correct params", () => {
            const created_at = new Date();
            const newCategory = Category.create({
                name: "any_name",
                description: "any_description",
                created_at,
                is_active: true
            });
            expect(newCategory.name).toBe("any_name");
            expect(newCategory.description).toBe("any_description");
            expect(newCategory.category_id).toBeInstanceOf(Uuid);
            expect(newCategory.created_at).toBe(created_at);
            expect(newCategory.is_active).toBeTruthy();
        })

        test("should create new category and test update methods", () => {
            const created_at = new Date();
            const newCategory = Category.create({
                name: "any_name",
                description: "any_description",
                created_at,
                is_active: true
            });
            expect(newCategory.name).toBe("any_name");
            expect(newCategory.description).toBe("any_description");
            expect(newCategory.category_id).toBeInstanceOf(Uuid);
            expect(newCategory.created_at).toBe(created_at);
            expect(newCategory.is_active).toBeTruthy();

            newCategory.changeName("other_name");
            newCategory.changeDescription("other_description");
            newCategory.deactivate();
            expect(newCategory.name).toBe("other_name");
            expect(newCategory.description).toBe("other_description");
            expect(newCategory.category_id).toBeInstanceOf(Uuid);
            expect(newCategory.created_at).toBe(created_at);
            expect(newCategory.is_active).toBeFalsy();
            
            newCategory.activate();
            expect(newCategory.is_active).toBeTruthy();
        })
    })

    describe("catedogy_id field", () => {
        const arrange = [
            {category_id: null}, {category_id: undefined}, {category_id: new Uuid()}
        ]
        test.each(arrange)("id = %j", ({ category_id }) => {
            const category = new Category({
                name: "Movie",
                category_id: category_id as any
            });
            expect(category.category_id).toBeInstanceOf(Uuid)
        })
    })
    describe("Category Validator", () => {
        test("should an invalid category with name property", () => {
            expect(() => Category.create({ name: null })).containsErrorMessages({
                name: [
                  "name should not be empty",
                  "name must be a string",
                  "name must be shorter than or equal to 255 characters",
                ],
            });

            expect(() => Category.create({ name: "" })).containsErrorMessages({
                name: ["name should not be empty"],
            });
        
            expect(() => Category.create({ name: 5 as any })).containsErrorMessages({
                name: [
                    "name must be a string",
                    "name must be shorter than or equal to 255 characters",
                ],
            });
        
            expect(() => Category.create({ name: "t".repeat(256) })).containsErrorMessages({
                name: ["name must be shorter than or equal to 255 characters"],
            });
        });
        test("should a invalid category using description property", () => {
            expect(() => Category.create({ description: 5 } as any)).containsErrorMessages({
              description: ["description must be a string"],
            });
        });
      
        test("should a invalid category using is_active property", () => {
            expect(() => Category.create({ is_active: 5 } as any)).containsErrorMessages({
                is_active: ["is_active must be a boolean value"],
            });
        });

    })
});
