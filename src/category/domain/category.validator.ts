
import { MaxLength, IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { Category } from './category.entity';
import { ClassValidatorFields } from '../../shared/validators/class-validator-fields';

class CategoryRules {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsBoolean()
    @IsNotEmpty()
    is_active: string;

    constructor({ name, description, is_active }: Category) {
        Object.assign(this, { name, description, is_active });
    }
}

export class CategoryValidator extends ClassValidatorFields<CategoryRules> {
    validate(entity: Category) {
        return super.validate(new CategoryRules(entity));
    }
}

export class CategoryValidatorFactory {
    static create() {
        return new CategoryValidator();
    }
}